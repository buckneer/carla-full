"use client";

import { useState } from "react";
import { Save, Bell, Shield, Camera, Clock, DollarSign, Users } from "lucide-react";
import SettingsLayout from "@/components/settings/SettingsLayout";
import General from "@/components/settings/operator/General";
import System from "@/components/settings/operator/System";
import Pricing from "@/components/settings/operator/Pricing";
import Notifications from "@/components/settings/operator/Notifications";
import Security from "@/components/settings/operator/Security";
import Hours from "@/components/settings/operator/Hours";
import { useToast } from "@/components/context/ToastContext";

export default function OperatorSettingsPage() {

	const { addToast } = useToast();

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


	const handleSave = () => {
		// Handle save logic here
		// console.log("Settings saved:", settings);
		addToast("success", "Settings saved successfully");
	};

	const tabs = [
		{ id: "general", label: "General", icon: Users, component: <General /> },
		{ id: "system", label: "System", icon: Camera, component: <System /> },
		{ id: "pricing", label: "Pricing", icon: DollarSign, component: <Pricing /> },
		{ id: "notifications", label: "Notifications", icon: Bell, component: <Notifications /> },
		{ id: "security", label: "Security", icon: Shield, component: <Security /> },
		{ id: "hours", label: "Operating Hours", icon: Clock, component: <Hours /> },
	];

	return (
		<div className="p-8">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Settings</h1>
				<p className="text-gray-600 mt-2">
					Configure your parking facility settings and preferences
				</p>
			</div>

			<SettingsLayout items={tabs} initialTab="general" />

			{/* Save Button */}
			<div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
				<div className="flex justify-end">
					<button
						onClick={handleSave}
						className="inline-flex items-center px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
					>
						<Save className="h-4 w-4 mr-2" />
						Save Settings
					</button>
				</div>
			</div>
		</div>
	);
}
