import { createClient } from "@/utils/supabase/server";

export async function POST() {
	const { supabase, response } = await createClient();
	await supabase.auth.signOut(); // emits Set-Cookie: ...; Max-Age=0
	return new Response(null, { status: 200, headers: response.headers });
}
