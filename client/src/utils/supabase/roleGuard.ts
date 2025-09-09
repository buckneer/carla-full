import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function requireOperator() {
	const { supabase, response } = await createClient();

	// Grab the current session
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// If no session, clear any cookies and return null
	if (!user) {
		return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
	}

	const { data: userRow, error: profileError } = await supabase
		.from("users")
		.select("role")
		.eq("id", user.id)
		.single();

	if (profileError || userRow.role !== "operator") {
		return NextResponse.json({ error: "Forbidden" }, { status: 403 });
	}

	return user.id;
}
