"use client";

import React, { useState } from "react";

function Privacy() {
	const [settings, setSettings] = useState({
		// Profile Settings
		name: "John Smith",
		email: "john.smith@email.com",
		phone: "+1 (555) 123-4567",

		// Notification Settings
		emailNotifications: true,
		smsNotifications: false,
		pushNotifications: true,
		entryExitAlerts: true,
		paymentAlerts: true,

		// Privacy Settings
		shareUsageData: false,
		allowLocationTracking: true,

		// Payment Settings
		autoPayment: true,
		paymentMethod: "card",

		// Preferences
		defaultVehicle: "ABC-123",
		preferredLocations: ["Downtown Plaza", "Mall Parking"],
		language: "en",
		timezone: "America/New_York",
	});

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold text-gray-900 mb-6">Privacy & Data</h2>
			<div className="space-y-6">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-sm font-medium text-gray-900">Share Usage Data</h3>
							<p className="text-sm text-gray-500">
								Help improve our service by sharing anonymous usage data
							</p>
						</div>
						<input
							type="checkbox"
							checked={settings.shareUsageData}
							onChange={e =>
								setSettings({ ...settings, shareUsageData: e.target.checked })
							}
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-sm font-medium text-gray-900">Location Tracking</h3>
							<p className="text-sm text-gray-500">
								Allow location tracking for better parking recommendations
							</p>
						</div>
						<input
							type="checkbox"
							checked={settings.allowLocationTracking}
							onChange={e =>
								setSettings({
									...settings,
									allowLocationTracking: e.target.checked,
								})
							}
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
					</div>
				</div>

				<div className="pt-4 border-t border-gray-200">
					<h3 className="text-lg font-medium text-gray-900 mb-4">Data Management</h3>
					<div className="space-y-3">
						<button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
							<div className="font-medium text-gray-900">Download My Data</div>
							<div className="text-sm text-gray-500">Get a copy of all your data</div>
						</button>
						<button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
							<div className="font-medium text-gray-900">Data Portability</div>
							<div className="text-sm text-gray-500">
								Export your data to another service
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Privacy;
