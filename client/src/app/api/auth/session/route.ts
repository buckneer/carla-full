import { createClient } from "@/utils/supabase/server";

export async function GET() {
	// Initialize server‐side Supabase (reads the cookie)
	const { supabase, response } = await createClient();

	// Grab the current session
	const {
		data: { user },
	} = await supabase.auth.getUser();

	// If no session, clear any cookies and return null
	if (!user) {
		return new Response(JSON.stringify({ user: null, role: null }), {
			status: 200,
			headers: response.headers,
		});
	}

	// Otherwise, fetch the role
	const userId = user.id;
	const { data: userRow } = await supabase.from("users").select().eq("id", userId).single();

	return new Response(
		JSON.stringify({
			user: userRow,
		}),
		{
			status: 200,
			headers: response.headers,
		}
	);
}
