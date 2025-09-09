// app/api/devices/pair/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { requireOperator } from "@/utils/supabase/roleGuard";
import { createClient } from "@/utils/supabase/server";

type PairStartRequestBody = {
	factory_id: string;
	name?: string | null;
	location?: string | null;
};

type PairStartSuccess = {
	ok: true;
	message: string;
	pairing_expires: string; // ISO timestamp
	factory_secret?: string; // only present when a new device row was created
};

type ErrorResponse = { error: string };

function generateFactorySecret(): string {
	return crypto.randomBytes(24).toString("base64"); // ~32 chars base64
}

function nowPlusMinutesISO(mins = 10): string {
	return new Date(Date.now() + mins * 60 * 1000).toISOString();
}

export async function POST(req: NextRequest) {
	// 1) auth guard
	const operatorId = await requireOperator();
	if (operatorId instanceof NextResponse) return operatorId;

	// 2) supabase client
	const { supabase } = await createClient();

	// 3) parse body
	let body: PairStartRequestBody;
	try {
		body = (await req.json()) as PairStartRequestBody;
	} catch (e) {
		return NextResponse.json({ error: "Invalid JSON body" } as ErrorResponse, { status: 400 });
	}

	if (!body || typeof body.factory_id !== "string" || !body.factory_id.trim()) {
		return NextResponse.json({ error: "factory_id is required" } as ErrorResponse, {
			status: 400,
		});
	}

	const factoryId = body.factory_id.trim();
	const name = body.name?.trim() ?? null;
	const location = body.location?.trim() ?? null;

	try {
		// 4) try to find existing device by factory_id
		const { data: existing, error: selectErr } = await supabase
			.from("devices")
			.select("*")
			.eq("device_id", factoryId)
			.limit(1)
			.maybeSingle();

		if (selectErr) {
			console.error("[pair] supabase select error", selectErr);
			return NextResponse.json({ error: "Database error" } as ErrorResponse, { status: 500 });
		}

		const pairingExpires = nowPlusMinutesISO(10);

		if (existing) {
			// If already claimed -> conflict
			if (existing.claimed_by) {
				return NextResponse.json({ error: "Device already claimed" } as ErrorResponse, {
					status: 409,
				});
			}
			if (existing.pairing_pending) {
				return NextResponse.json(
					{ error: "Pairing already pending for this device" } as ErrorResponse,
					{ status: 409 }
				);
			}

			// Update existing row to initiate pairing.
			// Reset any previous challenge/failures so pairing starts fresh.
			const { error: updateErr } = await supabase
				.from("devices")
				.update({
					pairing_pending: true,
					pairing_user: operatorId,
					pairing_expires: pairingExpires,
					name: name ?? existing.name,
					location: location ?? existing.location,
					pairing_challenge: null,
					pairing_challenge_expires: null,
					pairing_failed_attempts: 0,
				})
				.eq("id", existing.id);

			if (updateErr) {
				console.error("[pair] supabase update error", updateErr);
				return NextResponse.json(
					{ error: "Failed to update device record" } as ErrorResponse,
					{
						status: 500,
					}
				);
			}

			const resp: PairStartSuccess = {
				ok: true,
				message:
					"Pairing started. Device must call pairing-complete endpoint within the window.",
				pairing_expires: pairingExpires,
			};
			return NextResponse.json(resp, { status: 200 });
		} else {
			// Create new device row and generate factory_secret
			const factorySecret = generateFactorySecret();

			const insertPayload = {
				device_id: factoryId,
				factory_secret: factorySecret,
				name,
				location,
				pairing_pending: true,
				pairing_user: operatorId,
				pairing_expires: pairingExpires,
				// init pairing-challenge fields
				pairing_challenge: null,
				pairing_challenge_expires: null,
				pairing_failed_attempts: 0,
				claimed_by: null,
				claimed_at: null,
				secret: null,
				revoked: false,
				created_at: new Date().toISOString(),
			};

			const { data: inserted, error: insertErr } = await supabase
				.from("devices")
				.insert(insertPayload)
				.select()
				.single();

			if (insertErr) {
				console.error("[pair] supabase insert error", insertErr);
				return NextResponse.json(
					{
						error: insertErr.message ?? "Failed to create device record",
					} as ErrorResponse,
					{ status: 500 }
				);
			}

			const resp: PairStartSuccess = {
				ok: true,
				message:
					"Device record created and pairing started. Save the factory secret on the physical device label. (Returned only on creation).",
				pairing_expires: pairingExpires,
				factory_secret: factorySecret,
			};
			return NextResponse.json(resp, { status: 201 });
		}
	} catch (err: any) {
		console.error("[pair] unexpected error", err);
		return NextResponse.json({ error: err?.message ?? "Internal error" } as ErrorResponse, {
			status: 500,
		});
	}
}
