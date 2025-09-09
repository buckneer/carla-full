// app/api/facility/[id]/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { requireOperator } from "@/utils/supabase/roleGuard";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const operatorId = await requireOperator();
	if (operatorId instanceof NextResponse) return operatorId; // no role

	// 1) Initialize Supabase client
	const { supabase } = await createClient();

	// 4) Parse body
	let body: Partial<{
		name: string;
		address: string;
		contact_email?: string;
		contact_phone?: string;
		hourly_rate: number;
		daily_max_rate: number;
		monthly_rate: number;
		recognition_sensitivity: string;
		auto_approval: boolean;
		max_vehicles_per_user: number;
	}>;

	try {
		body = await req.json();
	} catch (e) {
		return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
	}

	const { id } = await params;

	const { data: updated, error: updateError } = await supabase
		.from("facilities")
		.update({ ...body })
		.eq("id", id)
		.eq("operator_id", operatorId)
		.select()
		.single();

	if (updateError) {
		return NextResponse.json({ error: updateError.message }, { status: 400 });
	}

	return NextResponse.json(updated, { status: 200 });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
	const operatorId = await requireOperator();
	if (operatorId instanceof NextResponse) return operatorId; // no role

	// 1) Initialize Supabase client
	const { supabase } = await createClient();

	const {
		data: { user },
		error: sessionError,
	} = await supabase.auth.getUser();

	if (sessionError || !user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const userId = user.id;

	
	const { data: userRow, error: profileError } = await supabase
		.from("users")
		.select("role")
		.eq("id", userId)
		.single();
	if (profileError || userRow?.role !== "operator") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	const { id } = await params;

	const { error: deleteError } = await supabase
		.from("facilities")
		.delete()
		.eq("id", id)
		.eq("operator_id", userId);

	if (deleteError) {
		return NextResponse.json({ error: deleteError.message }, { status: 400 });
	}

	return NextResponse.json({ success: true }, { status: 200 });
}
