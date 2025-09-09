import React from "react";
import { StatCard } from "../common/ui/StatCard";
import { Activity, Car, TrendingUp, Users } from "lucide-react";

// Mock data for demonstration
const mockStats = {
	totalUsers: 1247,
	activeVehicles: 2156,
	todayEntries: 342,
	monthlyRevenue: 45600,
	avgDailyEntries: 287,
	peakHour: "2:00 PM - 3:00 PM",
};

function StatsGrid() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<StatCard
				title="Total Users"
				value={mockStats.totalUsers}
				changeText="+12% from last month"
				Icon={Users}
				color="blue"
			/>
			<StatCard
				title="Active Vehicles"
				value={mockStats.activeVehicles}
				changeText="+8% from last month"
				Icon={Car}
				color="green"
			/>
			<StatCard
				title="Today's Entries"
				value={mockStats.todayEntries}
				changeText="+15% from yesterday"
				Icon={Activity}
				color="purple"
			/>
			<StatCard
				title="Monthly Revenue"
				value={`$${mockStats.monthlyRevenue.toLocaleString()}`}
				changeText="+22% from last month"
				Icon={TrendingUp}
				color="orange"
			/>
		</div>
	);
}

export default StatsGrid;
