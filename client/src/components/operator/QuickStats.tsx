import React from "react";

const mockStats = {
	totalUsers: 1247,
	activeVehicles: 2156,
	todayEntries: 342,
	monthlyRevenue: 45600,
	avgDailyEntries: 287,
	peakHour: "2:00 PM - 3:00 PM",
};

function QuickStats() {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200">
			<div className="p-6 border-b border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900">Quick Stats</h3>
			</div>
			<div className="p-6 space-y-4">
				<div className="flex items-center justify-between">
					<span className="text-sm text-gray-600">Daily Average</span>
					<span className="text-sm font-semibold text-gray-900">
						{mockStats.avgDailyEntries}
					</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-sm text-gray-600">Peak Hour</span>
					<span className="text-sm font-semibold text-gray-900">2-3 PM</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-sm text-gray-600">Occupancy Rate</span>
					<span className="text-sm font-semibold text-green-600">87%</span>
				</div>
				<div className="flex items-center justify-between">
					<span className="text-sm text-gray-600">System Uptime</span>
					<span className="text-sm font-semibold text-green-600">99.9%</span>
				</div>
			</div>
		</div>
	);
}

export default QuickStats;
