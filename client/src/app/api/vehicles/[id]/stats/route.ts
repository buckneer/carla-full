// app/api/vehicles/[id]/stats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { requireOperator } from "@/utils/supabase/roleGuard";
import { DeviceEvent } from "@/utils/supabase/types";


export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	const vehicleId = params?.id;
	if (!vehicleId) {
		return NextResponse.json({ error: "Missing vehicle id" }, { status: 400 });
	}

	try {
		const { supabase } = await createClient();

		// get session user (if any)
		const { data: userData } = await supabase.auth.getUser();
		const currentUserId = userData?.user?.id ?? null;

		// fetch vehicle to check owner
		const { data: vehicleRow, error: vehicleErr } = await supabase
			.from("vehicles")
			.select("id, user_id")
			.eq("id", vehicleId)
			.maybeSingle();

		if (vehicleErr) {
			console.error("vehicle fetch error", vehicleErr);
			return NextResponse.json({ error: vehicleErr.message }, { status: 500 });
		}
		if (!vehicleRow) {
			return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
		}

		// allow if owner, otherwise require operator
		if (String(vehicleRow.user_id) !== String(currentUserId)) {
			// not the owner -> require operator
			const op = await requireOperator();
			if (op instanceof NextResponse) return op; // requireOperator already returns NextResponse for unauthorized
		}

		// NOTE: removed generic here to avoid TS error
		const { data: eventsData = null, error: eventsErr } = await supabase
			.from("device_events") // <- no generic
			.select("id, device_id, payload, received_at, vehicle_id")
			.eq("vehicle_id", vehicleId)
			.order("received_at", { ascending: false })
			.limit(1000);

		if (eventsErr) {
			console.error("device_events fetch error", eventsErr);
			return NextResponse.json({ error: eventsErr.message }, { status: 500 });
		}

		const events = (eventsData ?? []) as DeviceEvent[];

		// Compute stats: assumes payload.event or payload.type === "entry" | "exit"
		let total_entries = 0;
		let total_exits = 0;
		let last_used: string | null = null;

		for (const r of events) {
			const payload = r.payload ?? {};
			const evt = (payload.event ?? payload.type ?? "").toString().toLowerCase();

			if (evt === "entry") {
				total_entries++;
				if (!last_used && r.received_at) last_used = r.received_at;
			} else if (evt === "exit") {
				total_exits++;
			}
		}

		if (!last_used && events.length > 0) {
			last_used = events[0].received_at ?? null;
		}

		const recent_activity = events.slice(0, 50).map(r => ({
			id: r.id,
			device_id: r.device_id,
			received_at: r.received_at,
			payload: r.payload,
		}));

		return NextResponse.json(
			{
				vehicle_id: vehicleId,
				total_entries,
				total_exits,
				last_used,
				recent_activity,
				raw_count: events.length,
			},
			{ status: 200 }
		);
	} catch (err: any) {
		console.error("Unhandled error in /api/vehicles/[id]/stats", err);
		return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
	}
}
