import React from "react";

const mockRecentEntries = [
	{ id: 1, licensePlate: "ABC-123", user: "John Smith", time: "14:30", gate: "A", avatar: "JS" },
	{
		id: 2,
		licensePlate: "XYZ-789",
		user: "Sarah Johnson",
		time: "14:25",
		gate: "B",
		avatar: "SJ",
	},
	{ id: 3, licensePlate: "DEF-456", user: "Mike Davis", time: "14:20", gate: "A", avatar: "MD" },
	{ id: 4, licensePlate: "GHI-321", user: "Emily Chen", time: "14:15", gate: "C", avatar: "EC" },
	{ id: 5, licensePlate: "JKL-654", user: "Alex Wilson", time: "14:10", gate: "B", avatar: "AW" },
];

function RecentEntries() {
	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200">
			<div className="p-6 border-b border-gray-200">
				<h3 className="text-lg font-semibold text-gray-900">Live Entries</h3>
				<p className="text-sm text-gray-500 mt-1">Real-time vehicle entries</p>
			</div>
			<div className="p-6">
				<div className="space-y-4">
					{mockRecentEntries.map(entry => (
						<div key={entry.id} className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
								<span className="text-green-600 font-semibold text-xs">
									{entry.avatar}
								</span>
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-sm font-medium text-gray-900 truncate">
									{entry.licensePlate}
								</p>
								<p className="text-xs text-gray-500 truncate">{entry.user}</p>
							</div>
							<div className="text-right">
								<p className="text-xs text-gray-900">{entry.time}</p>
								<p className="text-xs text-gray-500">Gate {entry.gate}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default RecentEntries;
