// /middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();

	// 1) Build a Supabase SSR client that reads/writes cookies
	const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
		cookies: {
			getAll() {
				// NextRequest.cookies.getAll() returns { name, value, ... }[]
				return req.cookies.getAll().map(({ name, value }) => ({ name, value }));
			},
			setAll(cookies) {
				// When Supabase wants to set cookies, stash them onto our NextResponse
				cookies.forEach(({ name, value, options }) =>
					res.cookies.set(name, value, {
						httpOnly: options?.httpOnly,
						path: options?.path,
						sameSite: options?.sameSite,
						secure: options?.secure,
						expires: options?.expires,
					})
				);
			},
		},
	});

	// 2) Read the current session
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const url = req.nextUrl.clone();
	const { pathname } = url;

	// 3) Unauthenticated → block /dashboard/*
	if (!user && pathname.startsWith("/dashboard")) {
		url.pathname = "/login";
		return NextResponse.redirect(url);
	}

	// 4) If authenticated, load their role
	if (user) {
		const { data: userRow } = await supabase
			.from("users")
			.select("role")
			.eq("id", user.id)
			.single();

		const role = userRow?.role;

		// driver-only
		if (pathname.startsWith("/dashboard/driver") && role !== "driver") {
			url.pathname = "/dashboard/operator";
			return NextResponse.redirect(url);
		}

		// operator-only
		if (pathname.startsWith("/dashboard/operator") && role !== "operator") {
			url.pathname = "/dashboard/driver";
			return NextResponse.redirect(url);
		}

		// landing `/dashboard` → their home
		if (pathname === "/dashboard") {
			url.pathname = role === "operator" ? "/dashboard/operator" : "/dashboard/driver";
			return NextResponse.redirect(url);
		}
	}

	// 5) include any Set-Cookie headers that Supabase generated
	return res;
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
