"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, Home, BarChart3, Settings, LucideIcon } from "lucide-react";
import UserInfo from "./UserInfo";
import Logout from "./Logout";
import { DashboardRoute } from "@/utils/supabase/types";
import { iconMap } from "@/utils/iconMap";

interface SidebarProps {
	links: DashboardRoute[];
}

export default function DesktopSidebar({ links }: SidebarProps) {
	const pathname = usePathname();

	return (
		<aside className="hidden md:flex md:flex-col md:w-64 md:h-screen bg-white border-r border-gray-200 shadow-lg">
			<div className="flex items-center justify-between p-6 border-b border-gray-100">
				<Link href="/" className="flex items-center">
					<Car className="h-8 w-8 text-blue-600" />
					<span className="ml-2 text-2xl font-extrabold text-gray-900">Carla</span>
				</Link>
			</div>

			<nav className="h-full flex flex-col p-6 space-y-4">
				<UserInfo />

				{/* Main section with links */}
				<div className="flex-1 flex flex-col justify-between overflow-hidden">
					<div className="space-y-1 px-3 overflow-y-auto">
						{links.map(({ href, label, icon }) => {
							const isActive = pathname === href;
							const Icon = iconMap[icon] || Car;
							return (
								<Link
									key={href}
									href={href}
									className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors 
									${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
								>
									<Icon className="h-5 w-5 mr-3" />
									{label}
								</Link>
							);
						})}
					</div>

					{/* Logout button fixed at the bottom */}
					<Logout />
				</div>
			</nav>
		</aside>
	);
}
