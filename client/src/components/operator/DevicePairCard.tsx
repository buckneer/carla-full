"use client";
import React, { useState } from "react";

type PairStartRequestBody = {
  factory_id: string;
  name?: string | null;
  location?: string | null;
};

type PairStartSuccessResponse = {
  ok: true;
  message: string;
  pairing_expires: string;
  factory_secret?: string;
};

type PairStartErrorResponse = { error: string };

type StatusResponse = {
  device_id: string;
  pairing_pending: boolean;
  pairing_expires?: string | null;
  pairing_challenge?: string | null;
  pairing_challenge_expires?: string | null;
  claimed_by?: string | null;
  claimed_at?: string | null;
  name?: string | null;
  location?: string | null;
};

type DevicePairCardProps = {
  onPaired?: (resp: PairStartSuccessResponse) => void;
};

export default function DevicePairCard({ onPaired }: DevicePairCardProps) {
  const [factoryId, setFactoryId] = useState<string>("");
  const [deviceName, setDeviceName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [factorySecret, setFactorySecret] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [statusLoading, setStatusLoading] = useState<boolean>(false);
  const [canceling, setCanceling] = useState<boolean>(false);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setSuccess(null);
    setFactorySecret(null);
    setStatus(null);

    const fid = factoryId.trim();
    if (!fid) {
      setError("Factory ID is required (written on the device label)");
      return;
    }

    setLoading(true);
    try {
      const body: PairStartRequestBody = { factory_id: fid };
      if (deviceName.trim()) body.name = deviceName.trim();
      if (location.trim()) body.location = location.trim();

      const res = await fetch("/api/devices/pair", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "same-origin",
      });

      const json = (await res.json()) as PairStartSuccessResponse | PairStartErrorResponse;

      if (!res.ok) {
        // try to show server error message
        const errMsg = (json as PairStartErrorResponse).error || "Pairing failed";
        setError(errMsg);
        return;
      }

      const successBody = json as PairStartSuccessResponse;
      setSuccess(
        `Pairing started — expires at ${new Date(successBody.pairing_expires).toLocaleString()}`
      );

      // If factory_secret returned (new device), show it so technician can print/affix it
      if (successBody.factory_secret) {
        setFactorySecret(successBody.factory_secret);
      }

      // clear only inputs that make sense to clear (keep factory id visible for status actions)
      setDeviceName("");
      setLocation("");

      if (onPaired) onPaired(successBody);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    setError(null);
    setSuccess(null);
    setStatus(null);

    const fid = factoryId.trim();
    if (!fid) {
      setError("Factory ID is required to check status");
      return;
    }

    setStatusLoading(true);
    try {
      const res = await fetch(`/api/devices/pair/status?factory_id=${encodeURIComponent(fid)}`, {
        method: "GET",
        credentials: "same-origin",
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "Failed to fetch status");
        return;
      }
      setStatus(json as StatusResponse);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || String(err));
    } finally {
      setStatusLoading(false);
    }
  };

  const cancelPairing = async () => {
    setError(null);
    setSuccess(null);

    const fid = factoryId.trim();
    if (!fid) {
      setError("Factory ID is required to cancel pairing");
      return;
    }

    const confirmCancel = confirm("Cancel pairing for " + fid + "?");
    if (!confirmCancel) return;

    setCanceling(true);
    try {
      const res = await fetch("/api/devices/pair/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ factory_id: fid }),
        credentials: "same-origin",
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "Failed to cancel pairing");
        return;
      }
      setSuccess("Pairing cancelled.");
      setStatus(null);
      setFactorySecret(null);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || String(err));
    } finally {
      setCanceling(false);
    }
  };

  const copyFactorySecret = async () => {
    if (!factorySecret) return;
    try {
      await navigator.clipboard.writeText(factorySecret);
      setSuccess("Factory secret copied to clipboard");
      setTimeout(() => setSuccess(null), 2500);
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Pair a Device</h3>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700">Factory ID (on device label)</label>
        <input
          value={factoryId}
          onChange={(e) => setFactoryId(e.target.value)}
          placeholder="e.g. DEV-6A1B2C"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">Device Name (optional)</label>
          <input
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            placeholder="e.g. Entrance Camera #1"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Location / Zone (optional)</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. North Gate"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {factorySecret && (
        <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
          <div className="text-sm font-semibold text-gray-700">Factory secret (show only once)</div>
          <div className="mt-2 flex items-center space-x-3">
            <code className="px-2 py-1 bg-white border rounded text-sm break-all">{factorySecret}</code>
            <button type="button" onClick={copyFactorySecret} className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
              Copy
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2">Print or affix this secret on the physical device label (or place in sealed packaging).</div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <div className="flex-1">
          <div className="text-sm text-red-600">{error}</div>
          <div className="text-sm text-green-600">{success}</div>
        </div>

        <div className="ml-4 flex items-center gap-2">
          <button
            type="button"
            onClick={checkStatus}
            disabled={statusLoading}
            className="inline-flex items-center px-3 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-60"
          >
            {statusLoading ? "Checking…" : "Check Status"}
          </button>

          <button
            type="button"
            onClick={cancelPairing}
            disabled={canceling}
            className="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-60"
          >
            {canceling ? "Cancelling…" : "Cancel Pairing"}
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Pairing…" : "Start Pairing"}
          </button>
        </div>
      </div>

      {status && (
        <div className="mt-4 p-3 bg-gray-50 rounded border border-gray-200">
          <div className="text-sm font-semibold">Device Status</div>
          <div className="mt-2 text-xs text-gray-700 space-y-1">
            <div><strong>Device ID:</strong> {status.device_id}</div>
            <div><strong>Pairing pending:</strong> {String(status.pairing_pending)}</div>
            <div><strong>Pairing expires:</strong> {status.pairing_expires ? new Date(status.pairing_expires).toLocaleString() : "-"}</div>
            <div><strong>Claimed by:</strong> {status.claimed_by ?? "-"}</div>
            <div><strong>Claimed at:</strong> {status.claimed_at ? new Date(status.claimed_at).toLocaleString() : "-"}</div>
            <div><strong>Name:</strong> {status.name ?? "-" } {status.location ? ` / ${status.location}` : ""}</div>
          </div>
        </div>
      )}
    </form>
  );
}
