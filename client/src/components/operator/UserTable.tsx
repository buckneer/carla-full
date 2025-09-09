import { MoreVertical, Search } from "lucide-react";
import React, { useState } from "react";

const mockUsers = [
	{
		id: 1,
		name: "John Smith",
		email: "john.smith@email.com",
		vehicles: 2,
		totalEntries: 68,
		lastEntry: "2024-01-20 14:30",
		joinDate: "2024-01-15",
		status: "active",
		avatar: "JS",
	},
	{
		id: 2,
		name: "Sarah Johnson",
		email: "sarah.j@email.com",
		vehicles: 1,
		totalEntries: 45,
		lastEntry: "2024-01-19 16:45",
		joinDate: "2024-01-10",
		status: "active",
		avatar: "SJ",
	},
	{
		id: 3,
		name: "Mike Davis",
		email: "mike.davis@email.com",
		vehicles: 3,
		totalEntries: 123,
		lastEntry: "2024-01-20 09:15",
		joinDate: "2023-12-20",
		status: "active",
		avatar: "MD",
	},
	{
		id: 4,
		name: "Emily Chen",
		email: "emily.chen@email.com",
		vehicles: 1,
		totalEntries: 89,
		lastEntry: "2024-01-18 11:30",
		joinDate: "2024-01-05",
		status: "inactive",
		avatar: "EC",
	},
];

function UserTable() {
	const [searchTerm, setSearchTerm] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");

	const filteredUsers = mockUsers.filter(user => {
		const matchesSearch =
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter === "all" || user.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	return (
		<div className="lg:col-span-2">
			<div className="bg-white rounded-xl shadow-sm border border-gray-200">
				<div className="p-6 border-b border-gray-200">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
						<div className="flex items-center space-x-3">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
								<input
									type="text"
									placeholder="Search users..."
									value={searchTerm}
									onChange={e => setSearchTerm(e.target.value)}
									className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
								/>
							</div>
							<select
								value={statusFilter}
								onChange={e => setStatusFilter(e.target.value)}
								className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							>
								<option value="all">All Status</option>
								<option value="active">Active</option>
								<option value="inactive">Inactive</option>
							</select>
						</div>
					</div>
				</div>

				<div className="overflow-hidden">
					<table className="w-full">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									User
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Vehicles
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Entries
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Last Entry
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{filteredUsers.map(user => (
								<tr key={user.id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
												<span className="text-blue-600 font-semibold text-sm">
													{user.avatar}
												</span>
											</div>
											<div className="ml-4">
												<div className="text-sm font-medium text-gray-900">
													{user.name}
												</div>
												<div className="text-sm text-gray-500">
													{user.email}
												</div>
											</div>
										</div>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{user.vehicles}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
										{user.totalEntries}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{user.lastEntry}
									</td>
									<td className="px-6 py-4 whitespace-nowrap">
										<span
											className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
												user.status === "active"
													? "bg-green-100 text-green-800"
													: "bg-red-100 text-red-800"
											}`}
										>
											{user.status}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<button className="text-gray-400 hover:text-gray-600">
											<MoreVertical className="h-4 w-4" />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default UserTable;
