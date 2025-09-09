"use client";

import React, { useState } from "react";

function Notifications() {
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
			<h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
			<div className="space-y-6">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-sm font-medium text-gray-900">
								Email Notifications
							</h3>
							<p className="text-sm text-gray-500">Receive notifications via email</p>
						</div>
						<input
							type="checkbox"
							checked={settings.emailNotifications}
							onChange={e =>
								setSettings({ ...settings, emailNotifications: e.target.checked })
							}
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-sm font-medium text-gray-900">SMS Notifications</h3>
							<p className="text-sm text-gray-500">Receive notifications via SMS</p>
						</div>
						<input
							type="checkbox"
							checked={settings.smsNotifications}
							onChange={e =>
								setSettings({ ...settings, smsNotifications: e.target.checked })
							}
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-sm font-medium text-gray-900">
								Push Notifications
							</h3>
							<p className="text-sm text-gray-500">
								Receive push notifications on your device
							</p>
						</div>
						<input
							type="checkbox"
							checked={settings.pushNotifications}
							onChange={e =>
								setSettings({ ...settings, pushNotifications: e.target.checked })
							}
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-sm font-medium text-gray-900">Entry/Exit Alerts</h3>
							<p className="text-sm text-gray-500">
								Get notified when you enter or exit parking
							</p>
						</div>
						<input
							type="checkbox"
							checked={settings.entryExitAlerts}
							onChange={e =>
								setSettings({ ...settings, entryExitAlerts: e.target.checked })
							}
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-sm font-medium text-gray-900">Payment Alerts</h3>
							<p className="text-sm text-gray-500">
								Notifications about payments and billing
							</p>
						</div>
						<input
							type="checkbox"
							checked={settings.paymentAlerts}
							onChange={e =>
								setSettings({ ...settings, paymentAlerts: e.target.checked })
							}
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Notifications;
