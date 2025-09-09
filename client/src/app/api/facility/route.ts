import { requireOperator } from "@/utils/supabase/roleGuard";
import { createClient } from "@/utils/supabase/server";
import { Facility } from "@/utils/supabase/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const operatorId = await requireOperator();
	if (operatorId instanceof NextResponse) return operatorId; // no role

	const { supabase, response } = await createClient();

	let body: Facility;
	try {
		body = await req.json();
	} catch (e) {
		return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
	}

	console.log(body);

	const { data: inserted, error: insertError } = await supabase
		.from("facilities")
		.insert([
			{
				...body,
				operator_id: operatorId,
			},
		])
		.select()
		.single();

	if (insertError) {
		return NextResponse.json({ error: insertError.message }, { status: 400 });
	}

	return NextResponse.json(inserted, { status: 201 });
}

export async function GET(req: Request) {
	// 1) Initialize Supabase client
	const { supabase } = await createClient();

	// 2) Get session
	const {
		data: { user },
		error: sessionError,
	} = await supabase.auth.getUser();

	if (sessionError || !user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const userId = user.id;

	// 4) Fetch facilities for this operator
	const { data: facilities, error: fetchError } = await supabase
		.from("facilities")
		.select("*")
		.eq("operator_id", userId)
		.order("created_at", { ascending: false });

	if (fetchError) {
		return NextResponse.json({ error: fetchError.message }, { status: 500 });
	}

	// 5) Return the list
	return NextResponse.json(facilities, { status: 200 });
}
