import DevicePairCard from "@/components/operator/DevicePairCard";
import React, { useState } from "react";

// --- Types ---
type PairStartRequestBody = {
	factory_id: string;
	name?: string;
	location?: string;
};

type PairStartSuccessResponse = {
	ok: true;
	message: string;
	pairing_expires: string; // ISO timestamp
};

type PairStartErrorResponse = { error: string };

type PairStartResponse = PairStartSuccessResponse | PairStartErrorResponse;

type DevicePairCardProps = {
	onPaired?: (data: PairStartSuccessResponse) => void;
};


export default function System() {
	const [settings, setSettings] = useState({
		// General Settings
		facilityName: "Downtown Plaza Parking",
		facilityAddress: "123 Main Street, Downtown",
		contactEmail: "admin@downtownplaza.com",
		contactPhone: "+1 (555) 123-4567",

		// System Settings
		recognitionSensitivity: "high",
		autoApproval: false,
		maxVehiclesPerUser: 3,
		sessionTimeout: 30,

		// Pricing Settings
		hourlyRate: 4.5,
		dailyMaxRate: 25.0,
		monthlyRate: 150.0,

		// Notification Settings
		emailNotifications: true,
		smsNotifications: false,
		systemAlerts: true,
		userRegistrations: true,

		// Security Settings
		requirePhoneVerification: true,
		allowGuestAccess: false,
		dataRetentionDays: 90,

		// Operating Hours
		operatingHours: {
			monday: { open: "06:00", close: "22:00", enabled: true },
			tuesday: { open: "06:00", close: "22:00", enabled: true },
			wednesday: { open: "06:00", close: "22:00", enabled: true },
			thursday: { open: "06:00", close: "22:00", enabled: true },
			friday: { open: "06:00", close: "23:00", enabled: true },
			saturday: { open: "08:00", close: "23:00", enabled: true },
			sunday: { open: "08:00", close: "20:00", enabled: true },
		},
	});

	const onPaired = (data: PairStartSuccessResponse) => {
		// optional: refresh devices list, show toast, etc.
		console.log("paired:", data);
	};

	return (
		<div className="p-6 space-y-6">
			<div>
				<h2 className="text-xl font-semibold text-gray-900 mb-6">System Settings</h2>
				<div className="space-y-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Recognition Sensitivity
						</label>
						<select
							value={settings.recognitionSensitivity}
							onChange={e =>
								setSettings({ ...settings, recognitionSensitivity: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="low">Low - More permissive</option>
							<option value="medium">Medium - Balanced</option>
							<option value="high">High - Strict recognition</option>
						</select>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Max Vehicles per User
							</label>
							<input
								type="number"
								min={1}
								max={10}
								value={settings.maxVehiclesPerUser}
								onChange={e =>
									setSettings({
										...settings,
										maxVehiclesPerUser: Number.parseInt(e.target.value),
									})
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Session Timeout (minutes)
							</label>
							<input
								type="number"
								min={5}
								max={120}
								value={settings.sessionTimeout}
								onChange={e =>
									setSettings({
										...settings,
										sessionTimeout: Number.parseInt(e.target.value),
									})
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
					</div>
					<div className="flex items-center">
						<input
							type="checkbox"
							id="autoApproval"
							checked={settings.autoApproval}
							onChange={e =>
								setSettings({ ...settings, autoApproval: e.target.checked })
							}
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
						<label htmlFor="autoApproval" className="ml-2 text-sm text-gray-700">
							Auto-approve new vehicle registrations
						</label>
					</div>
				</div>
			</div>

			{/* New device pairing card */}
			<div className="max-w-3xl">
				<DevicePairCard onPaired={onPaired} />
			</div>
		</div>
	);
}
