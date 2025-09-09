import { Facility } from "@/utils/supabase/types";
import { Building2, Edit, Trash, Mail, MapPin, Phone, Settings, Users } from "lucide-react";
import React from "react";

interface FacilityItemProps {
	facility: Facility;
	handleEdit: (facility: Facility) => void;
	handleDelete: (id: string) => void;
}

function FacilityItem({ facility, handleEdit, handleDelete }: FacilityItemProps) {
	return (
		<div className="bg-white rounded-lg shadow-sm border border-gray-200">
			<div className="p-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center space-x-3">
						<div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
							<Building2 className="h-6 w-6 text-blue-600" />
						</div>
						<div>
							<h3 className="text-lg font-semibold text-gray-900">{facility.name}</h3>
						</div>
					</div>
					<div className="flex space-x-2">
						<button
							onClick={() => handleEdit(facility)}
							className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
						>
							<Edit className="h-4 w-4" />
						</button>
						<button
							onClick={() => handleDelete(facility.id!)}
							className="p-2 text-gray-400 hover:text-red-600 transition-colors"
						>
							<Trash className="h-4 w-4" />
						</button>
					</div>
				</div>

				<div className="space-y-3">
					<div className="flex items-center text-sm text-gray-600">
						<MapPin className="h-4 w-4 mr-2" />
						{facility.address}
					</div>
					{facility.contact_email && (
						<div className="flex items-center text-sm text-gray-600">
							<Mail className="h-4 w-4 mr-2" />
							{facility.contact_email}
						</div>
					)}
					{facility.contact_phone && (
						<div className="flex items-center text-sm text-gray-600">
							<Phone className="h-4 w-4 mr-2" />
							{facility.contact_phone}
						</div>
					)}
				</div>

				<div className="mt-4 pt-4 border-t border-gray-200">
					<div className="grid grid-cols-3 gap-4 text-center">
						<div>
							<p className="text-sm text-gray-500">Hourly</p>
							<p className="text-lg font-semibold text-gray-900">
								${facility.hourly_rate}
							</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Daily Max</p>
							<p className="text-lg font-semibold text-gray-900">
								${facility.daily_max_rate}
							</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Monthly</p>
							<p className="text-lg font-semibold text-gray-900">
								${facility.monthly_rate}
							</p>
						</div>
					</div>
				</div>

				<div className="mt-4 flex space-x-2">
					<button className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors">
						<Users className="h-4 w-4 mr-2" />
						Manage Users
					</button>
					<button className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
						<Settings className="h-4 w-4 mr-2" />
						Settings
					</button>
				</div>
			</div>
		</div>
	);
}

export default FacilityItem;
