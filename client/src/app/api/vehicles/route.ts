// app/api/vehicles/route.ts
import { requireOperator } from "@/utils/supabase/roleGuard";
import { createClient } from "@/utils/supabase/server";
import type { Vehicle } from "@/utils/supabase/types";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET:
 *  - GET /api/vehicles              -> vehicles for current session user
 *  - GET /api/vehicles?status=pending -> pending vehicles for operators (includes owner info)
 *  - GET /api/vehicles?user_id=...  -> operator can fetch for a specific user (requires operator)
 *
 * POST:
 *  - create vehicle for session user (or include user_id if operator)
 */

export async function GET(req: Request) {
	const url = new URL(req.url);
	const status = url.searchParams.get("status");
	const userIdParam = url.searchParams.get("user_id");

	const { supabase } = await createClient();

	// If user_id param exists, require operator
	if (userIdParam) {
		const operatorId = await requireOperator();
		if (operatorId instanceof NextResponse) return operatorId;
	}

	// If status === 'pending', require operator (we'll allow operator to read pending)
	if (status === "pending") {
		const operatorId = await requireOperator();
		if (operatorId instanceof NextResponse) return operatorId;
	}

	// If no userId param, use authenticated user
	let targetUserId = userIdParam;
	if (!targetUserId && status !== "pending") {
		const {
			data: { user },
			error: sessionError,
		} = await supabase.auth.getUser();

		if (sessionError || !user) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}
		targetUserId = user.id;
	}

	try {
		if (status === "pending") {
			// Fetch pending vehicles for operator, and attach owner info
			// First: attempt a single query with a join. This works if you have a foreign key
			// relationship between vehicles.user_id -> users.id (or profiles).
			// Adjust the join keys if your relation name differs.
			const attemptJoin = await supabase
				.from("vehicles")
				// try to select owner relation; update the relation name if yours is different
				// Many schemas name the related table "users" or "profiles" — we will try a few patterns below
				.select("*, users(id, email, full_name)")
				.eq("status", "pending")
				.order("created_at", { ascending: false });

			if (
				!attemptJoin.error &&
				Array.isArray(attemptJoin.data) &&
				attemptJoin.data.length > 0 &&
				(attemptJoin.data[0] as any).users
			) {
				// we have joined data
				const enriched = (attemptJoin.data as any[]).map(row => {
					const owner = row.users;
					return {
						...row,
						owner_full_name: owner?.full_name ?? null,
						owner_email: owner?.email ?? null,
					};
				});
				return NextResponse.json(enriched, { status: 200 });
			}

			// If join attempt did not return owner info, fallback:
			// fetch pending vehicles, then batch-fetch owner profiles from 'users' or 'profiles' table
			const { data: vehicles, error: vehiclesError } = await supabase
				.from("vehicles")
				.select("*")
				.eq("status", "pending")
				.order("created_at", { ascending: false });

			if (vehiclesError) {
				console.error("fetch pending vehicles error", vehiclesError);
				return NextResponse.json({ error: vehiclesError.message }, { status: 500 });
			}

			// collect user_ids
			const userIds = Array.from(new Set(vehicles.map(v => v.user_id).filter(Boolean)));

			let profilesMap: Record<
				string,
				{ id: string; email?: string | null; full_name?: string | null }
			> = {};

			if (userIds.length > 0) {
				// Try 'users' table first
				const tryUsers = await supabase
					.from("users")
					.select("id, email, full_name")
					.in("id", userIds);

				if (!tryUsers.error && Array.isArray(tryUsers.data) && tryUsers.data.length > 0) {
					for (const p of tryUsers.data as any[]) {
						profilesMap[p.id] = {
							id: p.id,
							email: p.email ?? null,
							full_name: p.full_name ?? null,
						};
					}
				} else {
					// Try 'profiles' table (common pattern)
					const tryProfiles = await supabase
						.from("profiles")
						.select("id, email, full_name")
						.in("id", userIds);

					if (
						!tryProfiles.error &&
						Array.isArray(tryProfiles.data) &&
						tryProfiles.data.length > 0
					) {
						for (const p of tryProfiles.data as any[]) {
							profilesMap[p.id] = {
								id: p.id,
								email: p.email ?? null,
								full_name: p.full_name ?? null,
							};
						}
					} else {
						// Could not find profile table — leave profilesMap empty (owner info will be null)
						console.warn(
							"Could not fetch profiles from users or profiles table",
							tryUsers.error ?? tryProfiles.error
						);
					}
				}
			}

			const enriched = vehicles.map(v => {
				const prof = profilesMap[v.user_id] ?? null;
				return {
					...v,
					owner_full_name: prof?.full_name ?? null,
					owner_email: prof?.email ?? null,
				};
			});

			return NextResponse.json(enriched, { status: 200 });
		}

		// Non-pending: fetch vehicles for a user (targetUserId must exist)
		const { data: userVehicles, error: fetchError } = await supabase
			.from("vehicles")
			.select("*")
			.eq("user_id", targetUserId)
			.order("created_at", { ascending: false });

		if (fetchError) {
			console.error("fetch user vehicles error", fetchError);
			return NextResponse.json({ error: fetchError.message }, { status: 500 });
		}

		return NextResponse.json(userVehicles ?? [], { status: 200 });
	} catch (err: any) {
		console.error(err);
		return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	const { supabase } = await createClient();
	let body: Partial<
		Vehicle & { user_id?: string; licensePlate?: string; license_plate?: string }
	>;

	try {
		body = await req.json();
	} catch (e) {
		return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
	}

	// If user_id is supplied, require operator
	if (body.user_id) {
		const operatorId = await requireOperator();
		if (operatorId instanceof NextResponse) return operatorId;
	} else {
		// ensure user session exists and set user_id to the session user
		const {
			data: { user },
			error: sessionError,
		} = await supabase.auth.getUser();

		if (sessionError || !user) {
			return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
		}
		body.user_id = user.id;
	}

	const licensePlate = (body as any).license_plate ?? (body as any).licensePlate;
	const make = (body as any).make;
	const model = (body as any).model;
	const yearRaw = (body as any).year;
	const color = (body as any).color;

	if (!licensePlate || !make || !model || !yearRaw || !color) {
		return NextResponse.json(
			{
				error: "Missing required fields: license_plate (or licensePlate), make, model, year, color",
			},
			{ status: 400 }
		);
	}

	const year = Number(yearRaw);
	if (!Number.isFinite(year) || year < 1886) {
		return NextResponse.json({ error: "Invalid year" }, { status: 400 });
	}

	try {
		const insertPayload = {
			user_id: body.user_id,
			license_plate: licensePlate,
			make,
			model,
			year,
			color,
			status: "pending" as const,
		};

		const { data: inserted, error: insertError } = await supabase
			.from("vehicles")
			.insert([insertPayload])
			.select()
			.single();

		if (insertError) {
			console.error("vehicles insert error", insertError);
			return NextResponse.json({ error: insertError.message }, { status: 400 });
		}

		return NextResponse.json(inserted, { status: 201 });
	} catch (err: any) {
		console.error(err);
		return NextResponse.json({ error: err.message ?? String(err) }, { status: 500 });
	}
}
