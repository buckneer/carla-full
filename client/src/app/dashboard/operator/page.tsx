"use client";

import { StatCard } from "@/components/common/ui/StatCard";
import UserTable from "@/components/operator/UserTable";
import RecentEntries from "@/components/operator/RecentEntries";
import QuickStats from "@/components/operator/QuickStats";
import QuickActions from "@/components/operator/QuickActions";
import StatsGrid from "@/components/operator/StatsGrid";


export default function OperatorDashboard() {
	


	return (
		<div className="p-8">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
				<p className="text-gray-600 mt-2">
					Monitor your parking facility performance and user activity
				</p>
			</div>

			{/* Stats Grid */}
			<StatsGrid />

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Users Table */}
				<UserTable />

				{/* Right Sidebar */}
				<div className="space-y-6">
					{/* Recent Entries */}
					<RecentEntries />

					{/* Quick Stats */}
					<QuickStats />

					{/* Quick Actions */}
					<QuickActions />
				</div>
			</div>
		</div>
	);
}
