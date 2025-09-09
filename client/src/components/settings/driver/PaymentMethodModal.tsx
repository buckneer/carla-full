import React from "react";

function PaymentMethodModal() {
	return (
		<div>
			{/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">
						{editingPayment ? "Edit Payment Method" : "Add Payment Method"}
					</h3>

					<form className="space-y-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Payment Type
							</label>
							<select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
								<option value="credit_card">Credit Card</option>
								<option value="debit_card">Debit Card</option>
								<option value="paypal">PayPal</option>
								<option value="apple_pay">Apple Pay</option>
								<option value="google_pay">Google Pay</option>
							</select>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Nickname (Optional)
							</label>
							<input
								type="text"
								placeholder="e.g., Work Card, Personal PayPal"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Card Number
								</label>
								<input
									type="text"
									placeholder="1234 5678 9012 3456"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									Expiry
								</label>
								<input
									type="text"
									placeholder="MM/YY"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									CVV
								</label>
								<input
									type="text"
									placeholder="123"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">
									ZIP Code
								</label>
								<input
									type="text"
									placeholder="12345"
									className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Cardholder Name
							</label>
							<input
								type="text"
								placeholder="John Smith"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>

						<div className="flex items-center">
							<input
								type="checkbox"
								className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-2"
							/>
							<label className="text-sm text-gray-700">
								Set as default payment method
							</label>
						</div>
					</form>

					<div className="flex space-x-3 mt-6">
						<button
							onClick={() => {
								setShowAddPayment(false);
								setEditingPayment(null);
							}}
							className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
						>
							Cancel
						</button>
						<button
							onClick={() => {
								// Handle save logic here
								setShowAddPayment(false);
								setEditingPayment(null);
							}}
							className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
						>
							{editingPayment ? "Update" : "Add"} Payment Method
						</button>
					</div>
				</div>
			</div> */}
		</div>
	);
}

export default PaymentMethodModal;
