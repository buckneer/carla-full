"use client";
import {
	Save,
	Bell,
	User,
	Shield,
	Car,
	CreditCard,
} from "lucide-react";
import Profile from "@/components/settings/driver/Profile";
import Notifications from "@/components/settings/driver/Notifications";
import Privacy from "@/components/settings/driver/Privacy";
import Payment from "@/components/settings/driver/Payment";
import Preferences from "@/components/settings/driver/Preferences";
import SettingsLayout from "@/components/settings/SettingsLayout";

export default function DriverSettingsPage() {
	const handleSave = () => {
		// Handle save logic here
		console.log("Settings saved:");
		alert("Settings saved successfully!");
	};

	const tabs = [
		{ id: "profile", label: "Profile", icon: User, component: <Profile /> },
		{ id: "notifications", label: "Notifications", icon: Bell, component: <Notifications /> },
		{ id: "privacy", label: "Privacy", icon: Shield, component: <Privacy /> },
		{ id: "payment", label: "Payment", icon: CreditCard, component: <Payment /> },
		{ id: "preferences", label: "Preferences", icon: Car, component: <Preferences /> },
	];

	return (
		<div className="p-8">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Settings</h1>
				<p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
			</div>
			<SettingsLayout items={tabs} initialTab="profile" />
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
			{/* Add/Edit Payment Method Modal showAddPayment || editingPayment and showDeleteAccount */}
		</div>
	);
}
