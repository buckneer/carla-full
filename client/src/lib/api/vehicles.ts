// lib/api/vehicles.ts
import type { Vehicle, User, DeviceEvent, VehicleStats } from "@/utils/supabase/types";

/**
 * Fetches vehicles for the current session user (server reads session from cookie).
 * Returns Vehicle[] exactly as the DB row shape (snake_case).
 */
export async function fetchVehicles(): Promise<Vehicle[]> {
	const res = await fetch("/api/vehicles", {
		method: "GET",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});

	const text = await res.text();
	let json: any = null;
	try {
		json = text ? JSON.parse(text) : null;
	} catch {
		// not JSON
	}

	if (!res.ok) {
		const msg = json?.error ?? res.statusText;
		throw new Error(msg);
	}

	return Array.isArray(json) ? (json as Vehicle[]) : [];
}

/**
 * Creates a vehicle for the current session user (or pass user_id if operator).
 * Accepts payload using DB keys (snake_case).
 * Returns the created Vehicle row from the DB (snake_case).
 */
export async function createVehicle(payload: {
	license_plate: string;
	make: string;
	model: string;
	year: number | string;
	color: string;
	user_id?: string; // optional, only for operators
}): Promise<Vehicle> {
	const res = await fetch("/api/vehicles", {
		method: "POST",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	const text = await res.text();
	let json: any = null;
	try {
		json = text ? JSON.parse(text) : null;
	} catch {}

	if (!res.ok) {
		const msg = json?.error ?? res.statusText;
		throw new Error(msg);
	}

	return json as Vehicle;
}

/**
 * Returns Vehicle[] as the DB returns them. For pending vehicles your server
 * should include owner info on each vehicle object, for example:
 * { ..., owner_full_name: "John Doe", owner_email: "john@example.com" }
 *
 * We don't create new types — we return Vehicle[] and access owner fields
 * with a narrow cast where needed in the UI.
 */
export async function fetchPendingVehicles(): Promise<Vehicle[]> {
	const res = await fetch("/api/vehicles?status=pending", {
		method: "GET",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});
	const text = await res.text();
	let json: any = null;
	try {
		json = text ? JSON.parse(text) : null;
	} catch {}
	if (!res.ok) {
		const msg = json?.error ?? res.statusText;
		throw new Error(msg);
	}
	return Array.isArray(json) ? (json as Vehicle[]) : [];
}

/**
 * Set vehicle status to active (approve). Server should set approved_by and approved_at.
 */
export async function approveVehicle(id: string): Promise<Vehicle> {
	const res = await fetch(`/api/vehicles/${encodeURIComponent(id)}`, {
		method: "PATCH",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ status: "active" }),
	});
	const text = await res.text();
	let json: any = null;
	try {
		json = text ? JSON.parse(text) : null;
	} catch {}
	if (!res.ok) {
		const msg = json?.error ?? res.statusText;
		throw new Error(msg);
	}
	return json as Vehicle;
}

/**
 * Set vehicle status to rejected.
 */
export async function rejectVehicle(id: string): Promise<Vehicle> {
	const res = await fetch(`/api/vehicles/${encodeURIComponent(id)}`, {
		method: "PATCH",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ status: "rejected" }),
	});
	const text = await res.text();
	let json: any = null;
	try {
		json = text ? JSON.parse(text) : null;
	} catch {}
	if (!res.ok) {
		const msg = json?.error ?? res.statusText;
		throw new Error(msg);
	}
	return json as Vehicle;
}

/**
 * Flexible fetcher for /api/vehicles/:id/stats
 * Handles:
 *  - server returning a stats object { total_entries, recent_activity, ... }
 *  - server returning recent_activity array of DeviceEvent
 *  - server returning a single DeviceEvent or a raw payload object
 */
export async function fetchVehicleStats(vehicleId: string): Promise<VehicleStats> {
	const res = await fetch(`/api/vehicles/${encodeURIComponent(vehicleId)}/stats`, {
		method: "GET",
		credentials: "include",
		headers: { "Content-Type": "application/json" },
	});

	const text = await res.text();
	let json: any = null;
	try {
		json = text ? JSON.parse(text) : null;
	} catch {
		// ignore parse error
	}

	if (!res.ok) {
		const msg = json?.error ?? res.statusText;
		throw new Error(msg);
	}

	// Case A: server already returns the stats shape
	if (json && (json.total_entries !== undefined || json.recent_activity !== undefined)) {
		const recent_activity = Array.isArray(json.recent_activity)
			? (json.recent_activity as any[]).map(it => it as DeviceEvent)
			: [];
		return {
			vehicle_id: String(json.vehicle_id ?? vehicleId),
			total_entries: Number(json.total_entries ?? 0),
			total_exits: Number(json.total_exits ?? 0),
			last_used: json.last_used ?? null,
			recent_activity,
			raw_count: Number(json.raw_count ?? recent_activity.length),
		};
	}

	// Case B: server returned an array of DeviceEvent
	if (Array.isArray(json)) {
		const recent_activity = json.map((it: any) => it as DeviceEvent);
		const totals = computeCountsFromEvents(recent_activity);
		return {
			vehicle_id: vehicleId,
			...totals,
			recent_activity,
			raw_count: recent_activity.length,
		};
	}

	// Case C: server returned a single event or a raw payload (e.g. { event, license_plate, location })
	if (json && typeof json === "object") {
		// If server returned a DeviceEvent row (has payload or id) use it; otherwise wrap payload into DeviceEvent.payload
		let deviceEvent: DeviceEvent;
		if (json.payload !== undefined || json.id !== undefined) {
			deviceEvent = json as DeviceEvent;
		} else {
			// top-level payload (the device sent): wrap it into DeviceEvent.payload
			deviceEvent = {
				id: String(json.id ?? ""), // might be empty
				device_id: json.device_id ?? null,
				payload: json, // the raw payload { event, license_plate, location }
				received_at: json.received_at ?? new Date().toISOString(),
				vehicle_id: json.vehicle_id ?? vehicleId,
			};
		}
		const recent_activity = [deviceEvent];
		const totals = computeCountsFromEvents(recent_activity);
		return {
			vehicle_id: vehicleId,
			...totals,
			recent_activity,
			raw_count: 1,
		};
	}

	// Fallback: empty
	return {
		vehicle_id: vehicleId,
		total_entries: 0,
		total_exits: 0,
		last_used: null,
		recent_activity: [],
		raw_count: 0,
	};
}

/** helper: compute totals and last_used from DeviceEvent[] */
function computeCountsFromEvents(events: DeviceEvent[]) {
	let total_entries = 0;
	let total_exits = 0;
	let last_used: string | null = null;

	for (const ev of events) {
		// payload may be either an object like { event: 'entry', license_plate: 'ABC-123' }
		const payload = ev.payload ?? {};
		const evt = (String(payload.event ?? payload.type ?? "").toLowerCase() ?? "").trim();

		if (["entry", "in", "enter"].includes(evt)) {
			total_entries++;
			if (!last_used && ev.received_at) last_used = ev.received_at;
		} else if (["exit", "out", "leave"].includes(evt)) {
			total_exits++;
		}
	}

	// fallback last_used to most recent event received_at if not found above
	if (!last_used && events.length > 0) {
		last_used = events[0].received_at ?? null;
	}

	return { total_entries, total_exits, last_used };
}
