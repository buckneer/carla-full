import React, { ReactNode, useState } from "react";
import { Tab } from "./SettingsSidebar";
import SettingsSidebar from "./SettingsSidebar";

export interface TabItem extends Tab {
	component: ReactNode;
}

export interface SettingsLayoutProps {
	items: TabItem[];
	initialTab?: string;
}

const SettingsLayout: React.FC<SettingsLayoutProps> = ({ items, initialTab }) => {
	const defaultTab = initialTab || items[0].id;
	const [activeTab, setActiveTab] = useState<string>(defaultTab);

	const tabs: Tab[] = items.map(({ id, label, icon }) => ({ id, label, icon }));
	const activeItem = items.find(item => item.id === activeTab);

	return (
		<div className="p-8 flex flex-col  gap-8">
			<SettingsSidebar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
			<div className="flex-1">
				<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
					{activeItem?.component}
				</div>
			</div>
		</div>
	);
};

export default SettingsLayout;
