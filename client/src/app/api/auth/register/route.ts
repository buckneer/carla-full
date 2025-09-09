// app/api/auth/register/route.ts
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
	const { email, password, full_name, role } = await req.json();

	// 1) Initialize Supabase & a Response to collect Set-Cookie headers
	const { supabase, response } = await createClient();

	// 2) Create the auth user
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error || !data.user) {
		console.error("signUp error:", error);
		return Response.json({ error: error?.message || "Registration failed" }, { status: 400 });
	}

	const userId = data.user.id;

	// 3) Insert into your users table
	const { error: usersErr } = await supabase
		.from("users")
		.insert([{ id: userId, email, full_name, role }]);

	if (usersErr) {
		console.error("users insert error:", usersErr);
		return Response.json({ error: usersErr.message }, { status: 500 });
	}

	// 4) Insert into user_settings
	const { error: settingsErr } = await supabase
		.from("user_settings")
		.insert([{ user_id: userId }]);

	if (settingsErr) {
		console.error("user_settings insert error:", settingsErr);
		return Response.json({ error: settingsErr.message }, { status: 500 });
	}

	// 5) Return success AND any Set-Cookie headers so the browser stays logged in
	return new Response(JSON.stringify({ user: data.user }), {
		status: 200,
		headers: response.headers,
	});
}
