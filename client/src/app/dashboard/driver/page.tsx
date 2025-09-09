"use client";

import React, { useEffect, useState } from "react";
import {
	Car,
	Plus,
	Edit,
	Trash2,
	Calendar,
	Clock,
	MapPin,
	TrendingUp,
	Activity,
} from "lucide-react";

import type { VehicleWithStats } from "@/utils/supabase/types";
import {
	fetchVehicles as apiFetchVehicles,
	createVehicle as apiCreateVehicle,
	fetchVehicleStats as apiFetchStats,
} from "@/lib/api/vehicles";

export default function DriverDashboard() {
	const [vehicles, setVehicles] = useState<VehicleWithStats[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const [showAddForm, setShowAddForm] = useState(false);
	const [newVehicle, setNewVehicle] = useState({
		license_plate: "",
		make: "",
		model: "",
		year: "",
		color: "",
	});

	useEffect(() => {
		let mounted = true;

		async function load() {
			setLoading(true);
			setError(null);

			try {
				// step 1: fetch vehicles
				const vehicles = await apiFetchVehicles();

				if (!mounted) return;

				// step 2: fetch stats for each vehicle
				const stats = await Promise.all(vehicles.map(v => apiFetchStats(v.id)));

				if (!mounted) return;

				// step 3: merge stats back into vehicles
				const vehiclesWithStats = vehicles.map((v, i) => ({
					...v,
					stats: stats[i], // attach stats by index
				}));


				setVehicles(vehiclesWithStats);
			} catch (err: any) {
				console.error("Failed fetching vehicles or stats:", err);
				if (mounted) setError(err?.message ?? "Failed to load vehicles");
			} finally {
				if (mounted) setLoading(false);
			}
		}

		load();

		return () => {
			mounted = false;
		};
	}, []);

	const handleAddVehicle = async (e: React.FormEvent) => {
		e.preventDefault();
		// basic validation
		if (
			!newVehicle.license_plate ||
			!newVehicle.make ||
			!newVehicle.model ||
			!newVehicle.year ||
			!newVehicle.color
		) {
			return;
		}

		const payload = {
			license_plate: newVehicle.license_plate,
			make: newVehicle.make,
			model: newVehicle.model,
			year: Number(newVehicle.year),
			color: newVehicle.color,
			// user_id omitted so server will create for current session user
		};

		try {
			const created = await apiCreateVehicle(payload);
			setVehicles(prev => [
				{
					...created,
					stats: {
						total_entries: 0,
						total_exits: 0,
						last_used: null,
						recent_activity: [],
						raw_count: 0,
					},
				},
				...prev,
			]);
			setNewVehicle({ license_plate: "", make: "", model: "", year: "", color: "" });
			setShowAddForm(false);
		} catch (err: any) {
			console.error("Failed to create vehicle:", err);
			setError(err?.message ?? "Failed to create vehicle");
		}
	};

	const handleDeleteVehicle = (id: string) => {
		// NOTE: local-only because no DELETE endpoint supplied.
		setVehicles(vs => vs.filter(v => String(v.id) !== String(id)));
	};

	// derive some stats from the fetched vehicles
	const totalVehicles = vehicles.length;
	// const totalEntries = vehicles.reduce((s, v) => s + Number(v.total_entries ?? 0), 0);
	// const avgEntriesPerWeek = Math.round((totalEntries / (4 || 1)) || 0);

	function formatDate(dateStr?: string | null) {
		if (!dateStr) return "-";
		try {
			return new Date(dateStr).toISOString().split("T")[0];
		} catch {
			return dateStr;
		}
	}

	function formatLastUsed(last_used?: string | null) {
		if (!last_used) return "-";
		// if you want nicer formatting later, change this
		return last_used;
	}

	return (
		<div className="p-8">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
				<p className="text-gray-600 mt-2">
					Manage your vehicles and track your parking activity
				</p>
			</div>

			{/* Stats Overview */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
				<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-blue-100 rounded-lg">
							<Car className="h-6 w-6 text-blue-600" />
						</div>
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-600">Total Vehicles</p>
							<p className="text-2xl font-bold text-gray-900">{totalVehicles}</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-green-100 rounded-lg">
							<Activity className="h-6 w-6 text-green-600" />
						</div>
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-600">Total Entries</p>
							<p className="text-2xl font-bold text-gray-900"></p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-purple-100 rounded-lg">
							<MapPin className="h-6 w-6 text-purple-600" />
						</div>
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-600">Favorite Location</p>
							<p className="text-lg font-bold text-gray-900">Downtown Plaza</p>
						</div>
					</div>
				</div>

				<div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
					<div className="flex items-center">
						<div className="p-2 bg-orange-100 rounded-lg">
							<TrendingUp className="h-6 w-6 text-orange-600" />
						</div>
						<div className="ml-4">
							<p className="text-sm font-medium text-gray-600">Weekly Average</p>
							<p className="text-2xl font-bold text-gray-900">3</p>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Vehicles List */}
				<div className="lg:col-span-2">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200">
						<div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
							<h2 className="text-lg font-semibold text-gray-900">My Vehicles</h2>
							<button
								onClick={() => setShowAddForm(true)}
								className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
							>
								<Plus className="h-4 w-4 mr-2" />
								Add Vehicle
							</button>
						</div>

						{showAddForm && (
							<div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
								<form
									onSubmit={handleAddVehicle}
									className="grid grid-cols-2 gap-4"
								>
									<input
										type="text"
										placeholder="License Plate"
										value={newVehicle.license_plate}
										onChange={e =>
											setNewVehicle({
												...newVehicle,
												license_plate: e.target.value,
											})
										}
										className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										required
									/>
									<input
										type="text"
										placeholder="Make"
										value={newVehicle.make}
										onChange={e =>
											setNewVehicle({ ...newVehicle, make: e.target.value })
										}
										className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										required
									/>
									<input
										type="text"
										placeholder="Model"
										value={newVehicle.model}
										onChange={e =>
											setNewVehicle({ ...newVehicle, model: e.target.value })
										}
										className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										required
									/>
									<input
										type="number"
										placeholder="Year"
										value={newVehicle.year}
										onChange={e =>
											setNewVehicle({ ...newVehicle, year: e.target.value })
										}
										className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										required
									/>
									<input
										type="text"
										placeholder="Color"
										value={newVehicle.color}
										onChange={e =>
											setNewVehicle({ ...newVehicle, color: e.target.value })
										}
										className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										required
									/>
									<div className="flex space-x-2">
										<button
											type="submit"
											className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
										>
											Add
										</button>
										<button
											type="button"
											onClick={() => setShowAddForm(false)}
											className="px-4 py-2 bg-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-400"
										>
											Cancel
										</button>
									</div>
								</form>
							</div>
						)}

						<div className="divide-y divide-gray-200">
							{loading && <div className="p-6">Loading vehicles…</div>}
							{error && <div className="p-6 text-red-600">Error: {error}</div>}
							{!loading && vehicles.length === 0 && (
								<div className="p-6 text-gray-600">No vehicles found.</div>
							)}
							{vehicles.map(vehicle => (
								<div key={String(vehicle.id)} className="px-6 py-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-4">
											<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
												<Car className="h-6 w-6 text-blue-600" />
											</div>
											<div>
												<h3 className="text-lg font-semibold text-gray-900">
													{vehicle.license_plate}
												</h3>
												<p className="text-sm text-gray-600">
													{vehicle.year} {vehicle.make} {vehicle.model} •{" "}
													{vehicle.color}
												</p>
												<div className="flex items-center space-x-4 mt-1">
													<span className="inline-flex items-center text-xs text-gray-500">
														<Calendar className="h-3 w-3 mr-1" />
														Registered: {formatDate(vehicle.created_at)}
													</span>
													<span className="inline-flex items-center text-xs text-gray-500">
														<Clock className="h-3 w-3 mr-1" />
														Last used: {formatLastUsed(vehicle.stats.last_used)}
													</span>
												</div>
											</div>
										</div>
										<div className="flex items-center space-x-4">
											<div className="text-right">
												<p className="text-sm font-medium text-gray-900">
													{vehicle.stats.total_entries} entries
												</p>
												<span
													className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
														vehicle.status === "active"
															? "bg-green-100 text-green-800"
															: "bg-red-100 text-red-800"
													}`}
												>
													{vehicle.status}
												</span>
											</div>
											<div className="flex space-x-2">
												<button className="p-2 text-gray-400 hover:text-blue-600">
													<Edit className="h-4 w-4" />
												</button>
												<button
													onClick={() =>
														handleDeleteVehicle(String(vehicle.id))
													}
													className="p-2 text-gray-400 hover:text-red-600"
												>
													<Trash2 className="h-4 w-4" />
												</button>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Recent Activity (still mock because no endpoint provided) */}
				<div className="lg:col-span-1">
					<div className="bg-white rounded-lg shadow-sm border border-gray-200">
						<div className="px-6 py-4 border-b border-gray-200">
							<h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
						</div>
						<div className="p-6 text-sm text-gray-500">
							Recent activity requires a separate endpoint (not implemented).
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
