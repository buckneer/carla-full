// services/deviceService.js
import crypto from "crypto";
import { supabaseAdmin } from "../config/supabase";

function nowISO() {
  return new Date().toISOString();
}
function generateDeviceSecret() {
  return crypto.randomBytes(32).toString("hex"); // 64 hex chars
}
function hashSecretSHA256(secret: string) {
  return crypto.createHash("sha256").update(secret).digest("hex");
}

/**
 * completePairing - device submits base64 HMAC computed as:
 *    HMAC_SHA256(factory_secret, pairing_challenge + "|" + device_id) -> base64
 *
 * on success: create device_secret (raw), store (currently as plain secret for compatibility),
 *             clear factory_secret and pairing fields, set claimed_by/claimed_at.
 */
export async function completePairing(deviceId: string, providedHmacBase64: string) {
  try {
    
    const { data: device, error: fetchError } = await supabaseAdmin
      .from("devices")
      .select("*")
      .eq("device_id", deviceId)
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      console.error("[completePairing] fetchError", fetchError);
      return { error: new Error("DB error") };
    }
    if (!device) {
      return { error: new Error("Unknown device") };
    }
    if (device.claimed_by) {
      return { error: new Error("Device already claimed") };
    }
    if (!device.pairing_pending || !device.pairing_challenge || !device.pairing_challenge_expires) {
      return { error: new Error("No pairing challenge/pending") };
    }
    if (new Date(device.pairing_challenge_expires).getTime() < Date.now()) {
      return { error: new Error("Challenge expired") };
    }
    if (!device.factory_secret) {
      return { error: new Error("Factory secret missing") };
    }

    const message = `${device.pairing_challenge}|${deviceId}`;
    const expectedBase64 = crypto.createHmac("sha256", device.factory_secret).update(message).digest("base64");

    const providedBuf = Buffer.from(providedHmacBase64, "base64");
    const expectedBuf = Buffer.from(expectedBase64, "base64");

    if (providedBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(providedBuf, expectedBuf)) {
      
      await supabaseAdmin
        .from("devices")
        .update({ pairing_failed_attempts: (device.pairing_failed_attempts || 0) + 1 })
        .eq("id", device.id);

      return { error: new Error("Invalid HMAC") };
    }

    
    const deviceSecret = generateDeviceSecret();
    
    const { data: updated, error: updateErr } = await supabaseAdmin
      .from("devices")
      .update({
        claimed_by: device.pairing_user,
        claimed_at: nowISO(),
      
        secret: deviceSecret,
        
        pairing_pending: false,
        pairing_expires: null,
        pairing_challenge: null,
        pairing_challenge_expires: null,
        factory_secret: null,
        pairing_failed_attempts: 0,
      })
      .eq("id", device.id)
      .select()
      .single();

    if (updateErr) {
      console.error("[completePairing] updateErr", updateErr);
      return { error: new Error("Failed to finalize pairing") };
    }

    return { deviceSecret, deviceRow: updated };
  } catch (err) {
    console.error("[completePairing] unexpected", err);
    return { error: err };
  }
}

/**
 * verifyDeviceHMAC - improved constant-time verification for runtime requests signed by device.
 *
 * Expected: device makes request and includes:
 *  - payload: string (the canonical payload the device signed)
 *  - timestamp: unix seconds string
 *  - signature: hex string of HMAC_SHA256(device.secret, payload + timestamp)
 *
 * This function fetches device.secret (must exist), checks timestamp window and validates HMAC.
 *
 */
export async function verifyDeviceHMAC(deviceId: string, payload: string, timestamp: any, signatureHex: any, allowedSkewSeconds = 30) {
  try {
   
    const { data: device, error } = await supabaseAdmin
      .from("devices")
      .select("*")
      .eq("device_id", deviceId)
      .eq("revoked", false)
      .maybeSingle();

    if (error || !device) return { ok: false, error: "Device not found or revoked" };
    if (!device.secret) return { ok: false, error: "Device secret not set" };

    
    const ts = parseInt(timestamp, 10);
    const now = Math.floor(Date.now() / 1000);
    if (Number.isNaN(ts) || Math.abs(now - ts) > allowedSkewSeconds) return { ok: false, error: "Timestamp out of range" };

    
    const hmac = crypto.createHmac("sha256", device.secret);
    hmac.update(payload + timestamp);
    const expectedHex = hmac.digest("hex");

  
    const providedBuf = Buffer.from(signatureHex, "hex");
    const expectedBuf = Buffer.from(expectedHex, "hex");
    if (providedBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(providedBuf, expectedBuf)) {
      return { ok: false, error: "Invalid HMAC" };
    }

    return { ok: true, device };
  } catch (err) {
    console.error("[verifyDeviceHMAC] unexpected", err);
    return { ok: false, error: "Internal error" };
  }
}
