"use client";
import React, { useState } from "react";

function Security() {
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
			<h2 className="text-xl font-semibold text-gray-900 mb-6">Security Settings</h2>
			<div className="space-y-6">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-sm font-medium text-gray-900">
								Require Phone Verification
							</h3>
							<p className="text-sm text-gray-500">
								Users must verify phone numbers during registration
							</p>
						</div>
						<input
							type="checkbox"
							checked={settings.requirePhoneVerification}
							onChange={e =>
								setSettings({
									...settings,
									requirePhoneVerification: e.target.checked,
								})
							}
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-sm font-medium text-gray-900">
								Allow Guest Access
							</h3>
							<p className="text-sm text-gray-500">
								Allow temporary access for unregistered vehicles
							</p>
						</div>
						<input
							type="checkbox"
							checked={settings.allowGuestAccess}
							onChange={e =>
								setSettings({ ...settings, allowGuestAccess: e.target.checked })
							}
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
					</div>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Data Retention (days)
					</label>
					<input
						type="number"
						min="30"
						max="365"
						value={settings.dataRetentionDays}
						onChange={e =>
							setSettings({
								...settings,
								dataRetentionDays: Number.parseInt(e.target.value),
							})
						}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
					<p className="text-sm text-gray-500 mt-1">
						How long to keep user activity data
					</p>
				</div>
			</div>
		</div>
	);
}

export default Security;
