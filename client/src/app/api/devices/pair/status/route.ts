// app/api/devices/pair/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireOperator } from "@/utils/supabase/roleGuard";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
	// operator guard (admin UI)
	const operatorId = await requireOperator();
	if (operatorId instanceof NextResponse) return operatorId;

	const url = new URL(req.url);
	const factoryId = (url.searchParams.get("factory_id") || "").trim();
	if (!factoryId) {
		return NextResponse.json({ error: "factory_id required" }, { status: 400 });
	}

	const { supabase } = await createClient();

	const { data: device, error } = await supabase
		.from("devices")
		.select(
			`device_id, pairing_pending, pairing_expires, pairing_challenge, pairing_challenge_expires, pairing_failed_attempts, claimed_by, claimed_at, name, location`
		)
		.eq("device_id", factoryId)
		.limit(1)
		.maybeSingle();

	if (error) {
		console.error("[pair/status] select error", error);
		return NextResponse.json({ error: "Database error" }, { status: 500 });
	}
	if (!device) {
		return NextResponse.json({ error: "Unknown device" }, { status: 404 });
	}

	// Return sanitized device info (no secrets)
	return NextResponse.json(device, { status: 200 });
}
