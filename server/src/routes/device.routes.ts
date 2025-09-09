import { Router } from "express";
import { completePairing } from "../services/device.service";
import { supabaseAdmin } from "../config/supabase";
import crypto from "crypto";

const router = Router();
const isoPlusSeconds = (secs = 120) => new Date(Date.now() + secs * 1000).toISOString();

router.post("/pair", async (req, res) => {
	const { device_id, hmac } = req.body; // expects base64 hmac

	if (!device_id || !hmac) {
		return res.status(400).json({ error: "device_id and hmac are required" });
	}

	try {
		const { deviceSecret, deviceRow, error } = await completePairing(device_id, hmac);

		if (error) {
			console.error("[pair] error", error);

			const msg = (error as any)?.message ?? String(error);
			if (msg.includes("Unknown device")) return res.status(404).json({ error: msg });
			if (msg.includes("already claimed")) return res.status(409).json({ error: msg });
			if (msg.includes("Invalid HMAC")) return res.status(401).json({ error: msg });
			if (msg.includes("expired") || msg.includes("No pairing"))
				return res.status(410).json({ error: msg });
			return res.status(400).json({ error: msg });
		}

		
		return res
			.status(200)
			.json({ success: true, device_secret: deviceSecret, device: deviceRow });
	} catch (err) {
		console.error("[pair] unexpected", err);
		return res.status(500).json({ error: "Internal error" });
	}
});

router.get("/pair/challenge", async (req, res) => {
	const deviceId = (req.query.device_id || "").toString().trim();
	if (!deviceId) return res.status(400).json({ error: "device_id required" });

	try {
		const { data: device, error: selErr } = await supabaseAdmin
			.from("devices")
			.select("*")
			.eq("device_id", deviceId)
			.limit(1)
			.maybeSingle();

		if (selErr) {
			console.error("[pair/challenge] db error", selErr);
			return res.status(500).json({ error: "DB error" });
		}
		if (!device) return res.status(404).json({ error: "Unknown device" });

		if (!device.pairing_pending || !device.pairing_expires) {
			return res.status(409).json({ error: "No pairing pending for this device" });
		}
		if (new Date(device.pairing_expires).getTime() < Date.now()) {
			return res.status(410).json({ error: "Pairing window expired" });
		}

		
		const nonce = crypto.randomBytes(32).toString("base64");
		const nonceExpiry = isoPlusSeconds(120); 

		const { error: updateErr } = await supabaseAdmin
			.from("devices")
			.update({ pairing_challenge: nonce, pairing_challenge_expires: nonceExpiry })
			.eq("id", device.id);

		if (updateErr) {
			console.error("[pair/challenge] updateErr", updateErr);
			return res.status(500).json({ error: "Failed to store challenge" });
		}

		return res.json({ challenge: nonce, expires: nonceExpiry, device_id: deviceId });
	} catch (err) {
		console.error("[pair/challenge] unexpected", err);
		return res.status(500).json({ error: "Internal error" });
	}
});

export default router;
