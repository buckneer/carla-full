"use client";
import React, { useState } from "react";

function Hours() {
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
			<h2 className="text-xl font-semibold text-gray-900 mb-6">Operating Hours</h2>
			<div className="space-y-4">
				{Object.entries(settings.operatingHours).map(([day, hours]) => (
					<div key={day} className="flex items-center space-x-4">
						<div className="w-20">
							<input
								type="checkbox"
								id={day}
								checked={hours.enabled}
								onChange={e =>
									setSettings({
										...settings,
										operatingHours: {
											...settings.operatingHours,
											[day]: { ...hours, enabled: e.target.checked },
										},
									})
								}
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
							/>
							<label
								htmlFor={day}
								className="text-sm font-medium text-gray-900 capitalize"
							>
								{day}
							</label>
						</div>
						<div className="flex items-center space-x-2">
							<input
								type="time"
								value={hours.open}
								onChange={e =>
									setSettings({
										...settings,
										operatingHours: {
											...settings.operatingHours,
											[day]: { ...hours, open: e.target.value },
										},
									})
								}
								disabled={!hours.enabled}
								className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
							/>
							<span className="text-gray-500">to</span>
							<input
								type="time"
								value={hours.close}
								onChange={e =>
									setSettings({
										...settings,
										operatingHours: {
											...settings.operatingHours,
											[day]: { ...hours, close: e.target.value },
										},
									})
								}
								disabled={!hours.enabled}
								className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Hours;
