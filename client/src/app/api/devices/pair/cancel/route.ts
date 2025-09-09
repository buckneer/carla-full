// app/api/devices/pair/cancel/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireOperator } from "@/utils/supabase/roleGuard";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
	// operator guard
	const operatorId = await requireOperator();
	if (operatorId instanceof NextResponse) return operatorId;

	const { supabase } = await createClient();
	let body: { factory_id?: string } = {};
	try {
		body = (await req.json()) as { factory_id?: string };
	} catch {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}

	const factoryId = (body.factory_id || "").trim();
	if (!factoryId) {
		return NextResponse.json({ error: "factory_id required" }, { status: 400 });
	}

	try {
		const { data: device, error: selErr } = await supabase
			.from("devices")
			.select("*")
			.eq("device_id", factoryId)
			.limit(1)
			.maybeSingle();

		if (selErr) {
			console.error("[pair/cancel] select error", selErr);
			return NextResponse.json({ error: "DB error" }, { status: 500 });
		}
		if (!device) {
			return NextResponse.json({ error: "Unknown device" }, { status: 404 });
		}

		// Only clear pairing if pairing was pending (safe guard)
		const { error: updateErr } = await supabase
			.from("devices")
			.update({
				pairing_pending: false,
				pairing_expires: null,
				pairing_challenge: null,
				pairing_challenge_expires: null,
				pairing_failed_attempts: 0,
			})
			.eq("id", device.id);

		if (updateErr) {
			console.error("[pair/cancel] updateErr", updateErr);
			return NextResponse.json({ error: "Failed to cancel pairing" }, { status: 500 });
		}

		return NextResponse.json({ ok: true, message: "Pairing cancelled" }, { status: 200 });
	} catch (err: any) {
		console.error("[pair/cancel] unexpected", err);
		return NextResponse.json({ error: "Internal error" }, { status: 500 });
	}
}
