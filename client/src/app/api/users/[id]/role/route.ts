// app/api/users/[id]/role/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
	const userId = params.id;
	const { supabase } = await createClient();

	// Query the role from your users table
	const { data, error } = await supabase.from("users").select("role").eq("id", userId).single();

	if (error || !data) {
		return NextResponse.json({ error: error?.message || "Role not found" }, { status: 404 });
	}

	return NextResponse.json({ role: data.role });
}
