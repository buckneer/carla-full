import React from "react";

function QuickActions() {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200">
			<div className="p-6 border-b border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
			</div>
			<div className="p-6 space-y-3">
				<button className="w-full px-4 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
					Generate Report
				</button>
				<button className="w-full px-4 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
					Export Data
				</button>
				<button className="w-full px-4 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
					System Settings
				</button>
			</div>
		</div>
	);
}

export default QuickActions;
