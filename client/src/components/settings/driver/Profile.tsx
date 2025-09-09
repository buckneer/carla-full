"use client";

import React, { useState } from "react";

function Profile() {
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
			<h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Information</h2>
			<div className="space-y-6">
				<div className="flex items-center space-x-6">
					<div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
						<span className="text-blue-600 font-semibold text-2xl">JS</span>
					</div>
					<div>
						<button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
							Change Photo
						</button>
						<p className="text-sm text-gray-500 mt-1">JPG, GIF or PNG. 1MB max.</p>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Full Name
						</label>
						<input
							type="text"
							value={settings.name}
							onChange={e => setSettings({ ...settings, name: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Email Address
						</label>
						<input
							type="email"
							value={settings.email}
							onChange={e => setSettings({ ...settings, email: e.target.value })}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Phone Number
					</label>
					<input
						type="tel"
						value={settings.phone}
						onChange={e => setSettings({ ...settings, phone: e.target.value })}
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="pt-4 border-t border-gray-200">
					<h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
					<div className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Current Password
							</label>
							<input
								type="password"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									New Password
								</label>
								<input
									type="password"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Confirm Password
								</label>
								<input
									type="password"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
