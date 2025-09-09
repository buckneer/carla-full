import { AlertTriangle } from "lucide-react";
import React from "react";

function DeleteAccountModal() {
	return (
		<div>
			{/* <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
				<div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
					<div className="flex items-center mb-4">
						<AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
						<h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
					</div>
					<p className="text-gray-600 mb-6">
						Are you sure you want to delete your account? This action cannot be undone
						and will permanently remove all your data, including vehicles, activity
						history, and payment information.
					</p>
					<div className="flex space-x-3">
						<button
							onClick={() => setShowDeleteAccount(false)}
							className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
						>
							Cancel
						</button>
						<button className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
							Delete Account
						</button>
					</div>
				</div>
			</div> */}
		</div>
	);
}

export default DeleteAccountModal;
