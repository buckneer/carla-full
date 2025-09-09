"use client";

import { Check, CreditCard, Edit2, Plus, Shield, Trash2 } from "lucide-react";
import React, { useState } from "react";

function Payment() {
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

	const [paymentMethods, setPaymentMethods] = useState([
		{
			id: "1",
			type: "credit_card",
			card_brand: "visa",
			last_four_digits: "4242",
			expiry_month: 12,
			expiry_year: 2025,
			cardholder_name: "John Smith",
			is_default: true,
			nickname: "Personal Card",
		},
		{
			id: "2",
			type: "paypal",
			wallet_email: "john.smith@email.com",
			is_default: false,
			nickname: "PayPal Account",
		},
	]);

	const [showAddPayment, setShowAddPayment] = useState(false);
	const [editingPayment, setEditingPayment] = useState<any>(null);

	const [activeTab, setActiveTab] = useState("profile");
	const [showDeleteAccount, setShowDeleteAccount] = useState(false);

	const handleSave = () => {
		// Handle save logic here
		console.log("Settings saved:", settings);
		alert("Settings saved successfully!");
	};

	return (
		<div className="p-6">
			<h2 className="text-xl font-semibold text-gray-900 mb-6">Payment & Billing</h2>

			{/* Auto Payment Setting */}
			<div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-sm font-medium text-blue-900">Auto Payment</h3>
						<p className="text-sm text-blue-700">
							Automatically charge your default payment method when parking
						</p>
					</div>
					<input
						type="checkbox"
						checked={settings.autoPayment}
						onChange={e => setSettings({ ...settings, autoPayment: e.target.checked })}
						className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
					/>
				</div>
			</div>

			{/* Payment Methods Section */}
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h3 className="text-lg font-medium text-gray-900">Payment Methods</h3>
					<button
						onClick={() => setShowAddPayment(true)}
						className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
					>
						<Plus className="h-4 w-4 mr-2" />
						Add Payment Method
					</button>
				</div>

				{/* Security Notice */}
				<div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
					<div className="flex items-start">
						<Shield className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
						<div>
							<h4 className="text-sm font-medium text-gray-900">
								Your payment information is secure
							</h4>
							<p className="text-sm text-gray-600 mt-1">
								We use industry-standard encryption and never store your full card
								numbers. Only the last 4 digits are kept for identification.
							</p>
						</div>
					</div>
				</div>

				{/* Payment Methods List */}
				<div className="space-y-3">
					{paymentMethods.map(method => (
						<div key={method.id} className="border border-gray-200 rounded-lg p-4">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
										{method.type === "credit_card" ||
										method.type === "debit_card" ? (
											<CreditCard className="h-5 w-5 text-gray-600" />
										) : method.type === "paypal" ? (
											<div className="text-xs font-bold text-blue-600">
												PP
											</div>
										) : method.type === "apple_pay" ? (
											<div className="text-xs font-bold text-gray-800">
												AP
											</div>
										) : (
											<div className="text-xs font-bold text-green-600">
												GP
											</div>
										)}
									</div>

									<div>
										<div className="flex items-center space-x-2">
											<span className="font-medium text-gray-900">
												{method.type === "credit_card" ||
												method.type === "debit_card"
													? `•••• •••• •••• ${method.last_four_digits}`
													: method.type === "paypal"
													? method.wallet_email
													: method.type === "apple_pay"
													? "Apple Pay"
													: "Google Pay"}
											</span>
											{method.is_default && (
												<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
													<Check className="h-3 w-3 mr-1" />
													Default
												</span>
											)}
										</div>

										<div className="text-sm text-gray-500">
											{method.nickname && <span>{method.nickname}</span>}
											{method.type === "credit_card" ||
											method.type === "debit_card" ? (
												<span className="ml-2">
													Expires {method.expiry_month}/
													{method.expiry_year}
												</span>
											) : null}
										</div>
									</div>
								</div>

								<div className="flex items-center space-x-2">
									{!method.is_default && (
										<button
											onClick={() => {
												setPaymentMethods(methods =>
													methods.map(m => ({
														...m,
														is_default: m.id === method.id,
													}))
												);
											}}
											className="text-sm text-blue-600 hover:text-blue-800 font-medium"
										>
											Set as Default
										</button>
									)}
									<button
										onClick={() => setEditingPayment(method)}
										className="p-2 text-gray-400 hover:text-gray-600"
									>
										<Edit2 className="h-4 w-4" />
									</button>
									<button
										onClick={() => {
											if (
												confirm(
													"Are you sure you want to remove this payment method?"
												)
											) {
												setPaymentMethods(methods =>
													methods.filter(m => m.id !== method.id)
												);
											}
										}}
										className="p-2 text-gray-400 hover:text-red-600"
									>
										<Trash2 className="h-4 w-4" />
									</button>
								</div>
							</div>
						</div>
					))}

					{paymentMethods.length === 0 && (
						<div className="text-center py-8 text-gray-500">
							<CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-300" />
							<p>No payment methods added yet</p>
							<p className="text-sm">Add a payment method to enable auto-payment</p>
						</div>
					)}
				</div>

				{/* Billing History Link */}
				<div className="pt-6 border-t border-gray-200">
					<button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
						<div className="font-medium text-gray-900">View Billing History</div>
						<div className="text-sm text-gray-500">
							See all your parking payments and receipts
						</div>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Payment;
