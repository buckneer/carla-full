"use client";

import React, { useEffect, useState } from "react";
import { Search, MoreVertical, Check, X, Plus, Mail, Phone, Calendar, Car } from "lucide-react";
import type { Vehicle } from "@/utils/supabase/types";
import { fetchPendingVehicles, approveVehicle, rejectVehicle } from "@/lib/api/vehicles";
import { useToast } from "@/components/context/ToastContext";

/**
 * Replace your mockPendingRequests UI with this component.
 * It fetches pending vehicles and shows:
 * - car info: "YEAR MAKE MODEL - COLOR - LICENSE"
 * - owner name and owner email (owner info must be included by the server)
 *
 * NOTE: vehicles returned by the server should include:
 *   owner_full_name: string
 *   owner_email: string
 * You can choose different field names server-side; update the usage below accordingly.
 */
export default function PendingVehiclesPanel() {
	const { addToast } = useToast();
	const [pending, setPending] = useState<Vehicle[]>([]);
	const [loading, setLoading] = useState(true);
	const [processingIds, setProcessingIds] = useState<string[]>([]);

	useEffect(() => {
		let mounted = true;
		async function load() {
			setLoading(true);
			try {
				const rows = await fetchPendingVehicles();
				if (!mounted) return;
				setPending(rows);
			} catch (err) {
				console.error("Failed to fetch pending vehicles", err);
			} finally {
				if (mounted) setLoading(false);
			}
		}
		load();
		return () => {
			mounted = false;
		};
	}, []);

	const markProcessing = (id: string, on = true) => {
		setProcessingIds(prev => (on ? [...prev, id] : prev.filter(x => x !== id)));
	};

	const handleApprove = async (vehicleId: string) => {
		if (!confirm("Approve this vehicle?")) return;
		markProcessing(vehicleId, true);
		try {
			await approveVehicle(vehicleId);
			setPending(prev => prev.filter(v => v.id !== vehicleId));
			addToast("success", "Vehicle Approved");
		} catch (err: any) {
			console.error("approve failed", err);
			addToast("danger", "Approve failed")
		} finally {
			markProcessing(vehicleId, false);
		}
	};

	const handleReject = async (vehicleId: string) => {
		if (!confirm("Reject this vehicle?")) return;
		markProcessing(vehicleId, true);
		try {
			await rejectVehicle(vehicleId);
			setPending(prev => prev.filter(v => v.id !== vehicleId));
			addToast("success", "Vehicle Rejected");
		} catch (err: any) {
			console.error("reject failed", err);
			addToast("danger", "Reject failed")
		} finally {
			markProcessing(vehicleId, false);
		}
	};

	return (
		<div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8 m-12">
			<div className="px-6 py-4 border-b border-gray-200">
				<h2 className="text-lg font-semibold text-gray-900">Pending Vehicle Approvals</h2>
				<p className="text-sm text-gray-600 mt-1">
					{pending.length} vehicle{pending.length !== 1 ? "s" : ""} waiting for approval
				</p>
			</div>

			{loading ? (
				<div className="p-8 text-center">Loading…</div>
			) : pending.length === 0 ? (
				<div className="p-8 text-center text-sm text-gray-600">No pending vehicles</div>
			) : (
				<div className="divide-y divide-gray-200">
					{pending.map(v => {
						// owner fields expected from server; we access them safely via any
						const ownerName =
							(v as any).owner_full_name ?? (v as any).owner_name ?? "-";
						const ownerEmail = (v as any).owner_email ?? (v as any).owner?.email ?? "-";

						const vehicleInfo = `${v.year} ${v.make} ${v.model} - ${v.color} - ${v.license_plate}`;

						const processing = processingIds.includes(v.id);

						return (
							<div key={v.id} className="px-6 py-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-4">
										<div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
											<span className="text-yellow-600 font-semibold text-sm">
												{(ownerName || "U")
													.split(" ")
													.map((n: any, i: any) => (i < 2 ? n[0] : ""))
													.join("")}
											</span>
										</div>

										<div>
											<h3 className="text-lg font-semibold text-gray-900">
												{vehicleInfo}
											</h3>
											<div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
												<span className="flex items-center">
													<Mail className="h-4 w-4 mr-1" />
													{ownerEmail}
												</span>
												<span className="flex items-center">
													<Calendar className="h-4 w-4 mr-1" />
													{v.created_at
														? v.created_at.split("T")[0]
														: "-"}
												</span>
											</div>

											<div className="flex items-center mt-2 text-sm text-gray-500">
												<Car className="h-4 w-4 mr-1" />
												Owner: {ownerName}
											</div>
										</div>
									</div>

									<div className="flex space-x-2">
										<button
											onClick={() => handleApprove(v.id)}
											disabled={processing}
											className="inline-flex items-center px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60"
										>
											<Check className="h-4 w-4 mr-1" />
											{processing ? "Processing…" : "Approve"}
										</button>

										<button
											onClick={() => handleReject(v.id)}
											disabled={processing}
											className="inline-flex items-center px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
										>
											<X className="h-4 w-4 mr-1" />
											Reject
										</button>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
