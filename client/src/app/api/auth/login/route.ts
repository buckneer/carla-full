// app/api/auth/login/route.ts
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
	const { email, password } = await req.json();

	// initialize supabase + a Response collector for cookies
	const { supabase, response } = await createClient();

	// 1) sign in
	const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (authErr || !authData.session) {
		console.error("signIn error:", authErr);
		return new Response(JSON.stringify({ error: authErr?.message || "Login failed" }), {
			status: 400,
		});
	}

	// 2) fetch the user's role
	const userId = authData.session.user.id;
	const { data: userRow, error: userErr } = await supabase
		.from("users")
		.select("role")
		.eq("id", userId)
		.single();

	if (userErr || !userRow) {
		console.error("fetch role error:", userErr);
		return new Response(
			JSON.stringify({ error: userErr?.message || "Could not determine user role" }),
			{ status: 500 }
		);
	}

	// 3) return session + role, and include Set-Cookie headers
	return new Response(JSON.stringify({ role: userRow.role }), {
		status: 200,
		headers: response.headers,
	});
}
