"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Car, X, Menu } from "lucide-react";
import UserInfo from "./UserInfo";
import Logout from "./Logout";
import { DashboardRoute } from "@/utils/supabase/types";
import { usePathname } from "next/navigation";
import { iconMap } from "@/utils/iconMap";

interface SidebarProps {
	links: DashboardRoute[];
}

export default function MobileSidebar({ links }: SidebarProps) {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{/* Overlay */}
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 transition-opacity duration-300 md:hidden 
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
				onClick={() => setIsOpen(false)}
			/>

			{/* Toggle Button */}
			<button
				onClick={() => setIsOpen(!isOpen)}
				aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
				className="fixed top-4 right-4 z-50 p-2 bg-white shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
			>
				{isOpen ? (
					<X className="w-6 h-6 text-gray-800" />
				) : (
					<Menu className="w-6 h-6 text-gray-800" />
				)}
			</button>

			{/* Sidebar */}
			<aside
				className={`
          			fixed top-0 left-0 z-40 h-full w-full bg-white border-r border-gray-200 shadow-lg
					transform transition-transform duration-300 ease-in-out
					md:hidden
					flex flex-col
         		 	${isOpen ? "translate-x-0" : "-translate-x-full"} 
        		`}
			>
				<div className="flex items-center justify-between p-6 border-b border-gray-100">
					<Link href="/" className="flex items-center">
						<Car className="h-8 w-8 text-blue-600" />
						<span className="ml-2 text-2xl font-extrabold text-gray-900">Carla</span>
					</Link>
				</div>

				<nav className="h-full flex flex-col p-6 space-y-4">
					<UserInfo />

					<div className="flex flex-col flex-grow justify-between">
						{/* Scrollable links container */}
						<div className="space-y-1 px-3 overflow-y-auto">
							{links.map(({ href, label, icon }) => {
								const isActive = pathname === href;
								const Icon = iconMap[icon] || Car;
								return (
									<Link
										key={href}
										href={href}
										onClick={() => setIsOpen(false)}
										className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
										${isActive ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"}`}
									>
										<Icon className="h-5 w-5 mr-3" />
										{label}
									</Link>
								);
							})}
						</div>

						{/* Logout pinned at bottom */}
						<Logout />
					</div>
				</nav>
			</aside>
		</>
	);
}
