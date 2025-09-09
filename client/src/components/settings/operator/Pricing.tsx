"use client";
import { AlertTriangle } from "lucide-react";
import React, { useState } from "react";

function Pricing() {
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

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing Settings</h2>
			<div className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Hourly Rate ($)
						</label>
						<input
							type="number"
							step="0.25"
							min="0"
							value={settings.hourlyRate}
							onChange={e =>
								setSettings({
									...settings,
									hourlyRate: Number.parseFloat(e.target.value),
								})
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Daily Maximum ($)
						</label>
						<input
							type="number"
							step="0.50"
							min="0"
							value={settings.dailyMaxRate}
							onChange={e =>
								setSettings({
									...settings,
									dailyMaxRate: Number.parseFloat(e.target.value),
								})
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Monthly Rate ($)
						</label>
						<input
							type="number"
							step="5.00"
							min="0"
							value={settings.monthlyRate}
							onChange={e =>
								setSettings({
									...settings,
									monthlyRate: Number.parseFloat(e.target.value),
								})
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>
				<div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
					<div className="flex items-start">
						<AlertTriangle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
						<div>
							<h4 className="text-sm font-medium text-blue-900">
								Pricing Information
							</h4>
							<p className="text-sm text-blue-700 mt-1">
								Changes to pricing will take effect immediately for new parking
								sessions. Existing sessions will continue at their original rate.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Pricing;
