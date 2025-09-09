"use client";

import React, { useState } from "react";

function Preferences() {
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

	const [showDeleteAccount, setShowDeleteAccount] = useState(false)

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold text-gray-900 mb-6">Preferences</h2>
			<div className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Default Vehicle
						</label>
						<select
							value={settings.defaultVehicle}
							onChange={e =>
								setSettings({ ...settings, defaultVehicle: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="ABC-123">ABC-123 (Toyota Camry)</option>
							<option value="XYZ-789">XYZ-789 (Honda Civic)</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Language
						</label>
						<select
							value={settings.language}
							onChange={e => setSettings({ ...settings, language: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="en">English</option>
							<option value="es">Spanish</option>
							<option value="fr">French</option>
							<option value="de">German</option>
						</select>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
					<select
						value={settings.timezone}
						onChange={e => setSettings({ ...settings, timezone: e.target.value })}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="America/New_York">Eastern Time (ET)</option>
						<option value="America/Chicago">Central Time (CT)</option>
						<option value="America/Denver">Mountain Time (MT)</option>
						<option value="America/Los_Angeles">Pacific Time (PT)</option>
					</select>
				</div>

				<div className="pt-4 border-t border-gray-200">
					<h3 className="text-lg font-medium text-gray-900 mb-4">Account Actions</h3>
					<div className="space-y-3">
						<button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
							<div className="font-medium text-gray-900">Export Account Data</div>
							<div className="text-sm text-gray-500">
								Download all your account information
							</div>
						</button>
						<button
							onClick={() => setShowDeleteAccount(true)}
							className="w-full text-left px-4 py-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
						>
							<div className="font-medium text-red-900">Delete Account</div>
							<div className="text-sm text-red-600">
								Permanently delete your account and all data
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Preferences;
