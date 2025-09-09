import React from "react";
import { LucideIcon } from "lucide-react";

export interface Tab {
	id: string;
	label: string;
	icon: LucideIcon;
}

export interface SidebarProps {
	tabs: Tab[];
	activeTab: string;
	onTabClick: (tabId: string) => void;
}

const SettingsSidebar: React.FC<SidebarProps> = ({ tabs, activeTab, onTabClick }) => {
	return (
		<div className="w-full">
			<nav className="flex flex-wrap gap-2">
				{tabs.map(tab => {
					const Icon = tab.icon;
					const isActive = activeTab === tab.id;
					return (
						<button
							key={tab.id}
							onClick={() => onTabClick(tab.id)}
							className={`
								flex items-center w-full sm:w-auto px-4 py-3 text-sm font-medium rounded-md transition-colors
								${isActive
									? "bg-blue-100 text-blue-700"
									: "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
								}
							`}
						>
							<Icon className="h-5 w-5 mr-2" />
							<span className="whitespace-nowrap">{tab.label}</span>
						</button>
					);
				})}
			</nav>
		</div>
	);
};

export default SettingsSidebar;
