// testPairing.js
import fetch from "node-fetch"; // npm i node-fetch@2
import crypto from "crypto";

// --- CONFIG ---
const API_BASE = "http://localhost:5050/api/device"; 
const DEVICE_ID = "esp32-123456"; 
const FACTORY_SECRET = "SgLxdH5FJuyYV/xnShJ4nJgdgCcbFhvK"; 
// ---------------

async function runPairing() {
	console.log("🔌 Starting device pairing simulation...");
	console.log("📡 API Base:", API_BASE);
	console.log("📟 Device ID:", DEVICE_ID);
	console.log("🔑 Factory Secret (known only to device + DB):", FACTORY_SECRET);
	console.log("--------------------------------------------------");

	try {
		
		console.log("➡️  Step 1: Requesting challenge from server...");
		const challengeRes = await fetch(`${API_BASE}/pair/challenge?device_id=${DEVICE_ID}`);
		const challengeData = await challengeRes.json();

		console.log("⬅️  Challenge Response Status:", challengeRes.status);
		console.log("⬅️  Challenge Response Body:", challengeData);

		if (!challengeRes.ok) {
			console.error("❌ Could not get challenge. Stopping here.");
			return;
		}

		const challenge = challengeData.challenge;
		console.log("✅ Challenge received:", challenge);
		console.log("--------------------------------------------------");

		
		console.log("➡️  Step 2: Computing HMAC using factory_secret...");
		const message = `${challenge}|${DEVICE_ID}`;
		console.log("📝 Message to sign:", message);

		const hmacBase64 = crypto
			.createHmac("sha256", FACTORY_SECRET)
			.update(message)
			.digest("base64");

		console.log("✅ HMAC (base64):", hmacBase64);
		console.log("--------------------------------------------------");

		
		console.log("➡️  Step 3: Sending pairing request to server...");
		const pairRes = await fetch(`${API_BASE}/pair`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ device_id: DEVICE_ID, hmac: hmacBase64 }),
		});

		const pairData = await pairRes.json();

		console.log("⬅️  Pair Response Status:", pairRes.status);
		console.log("⬅️  Pair Response Body:", pairData);

		if (!pairRes.ok) {
			console.error("❌ Pairing failed. See error above.");
			return;
		}

		console.log("🎉 Pairing SUCCESSFUL!");
		console.log(
			"🔐 Your new device secret (store securely on device!):",
			pairData.device_secret
		);
		console.log("📄 Full device row returned:", pairData.device);
		console.log("--------------------------------------------------");
	} catch (err) {
		console.error("💥 Unexpected error:", err);
	}
}

runPairing();
