"use client";
import React, { useState } from "react";

function Notifications() {
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
			<h2 className="text-xl font-semibold text-gray-900 mb-6">Notification Settings</h2>
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
							<h3 className="text-sm font-medium text-gray-900">System Alerts</h3>
							<p className="text-sm text-gray-500">Critical system notifications</p>
						</div>
						<input
							type="checkbox"
							checked={settings.systemAlerts}
							onChange={e =>
								setSettings({ ...settings, systemAlerts: e.target.checked })
							}
							className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
					</div>
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-sm font-medium text-gray-900">
								User Registrations
							</h3>
							<p className="text-sm text-gray-500">New user registration requests</p>
						</div>
						<input
							type="checkbox"
							checked={settings.userRegistrations}
							onChange={e =>
								setSettings({ ...settings, userRegistrations: e.target.checked })
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
