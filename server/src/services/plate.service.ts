import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { config } from "../config/env";
import { supabaseAdmin } from "../config/supabase";

export async function recognizePlate(filePath: string) {
	const data = new FormData();
	data.append("image", fs.createReadStream(filePath));

	// const response = await axios.post("https://api.platerecognizer.com/v1/plate-reader/", data, {
	// 	headers: {
	// 		Authorization: `Token ${config.plateApiKey}`,
	// 		...data.getHeaders(),
	// 	},
	// });
	const response = await axios.post("http://127.0.0.1:8000/recognize", data, {
		headers: {
			...data.getHeaders(),
		},
		timeout: 30_000,
	});

	return response.data; // raw API response
}

export async function isPlateRegistered(plate: string): Promise<boolean> {
	// normalize plate (optional, depends on your data)
	const normalized = plate.trim().toUpperCase();

	const { data, error } = await supabaseAdmin
		.from("vehicles")
		.select("license_plate")
		.eq("normalized_plate", normalized)
		.single();

	if (error && error.code !== "PGRST116") {
		// real error (not "no rows found")
		throw new Error(error.message);
	}

	return !!data; // true if found, false if not
}

/**
 * Create device_event: DO NOT supply `id` or `received_at` here.
 * Let Supabase/Postgres defaults generate them.
 */
export async function createDeviceEvent({
	device_id = null,
	payload,
	vehicle_id = null,
}: {
	device_id?: string | null;
	payload: any;
	vehicle_id?: string | null;
}) {
	const row = {
		// no id, no received_at -> DB defaults will apply
		device_id,
		payload,
		vehicle_id,
	};

	// return the inserted row (including id and received_at) by selecting it
	const { data, error } = await supabaseAdmin
		.from("device_events")
		.insert([row])
		.select()
		.single();

	if (error) {
		console.error("createDeviceEvent supabase error:", error);
		throw new Error(error.message);
	}

	return data;
}

/** helper: return vehicle row or null */
export async function getVehicleByPlate(plate: string) {
	const normalized = plate.trim().toUpperCase();
	const { data } = await supabaseAdmin
		.from("vehicles")
		.select("id, license_plate")
		.eq("normalized_plate", normalized)
		.maybeSingle();
	return data ?? null;
}
