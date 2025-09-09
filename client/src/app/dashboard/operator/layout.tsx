// app/dashboard/operator/layout.tsx
import Sidebar from "@/components/common/Sidebar";
import { DashboardRoute } from "@/utils/supabase/types";
import { BarChart3, Home, Settings, Users } from "lucide-react";

export default function OperatorLayout({ children }: { children: React.ReactNode }) {
	
	
	const links: DashboardRoute[] = [
		{ href: "/dashboard/operator", label: "Overview", icon: "Home" },
		{ href: "/dashboard/operator/users", label: "Users", icon: "Users" },
		{ href: "/dashboard/operator/analytics", label: "Analytics", icon: "BarChart3" },
		{ href: "/dashboard/operator/settings", label: "Settings", icon: "Settings" },
	];

	return (
		<div className="flex h-screen">
			<Sidebar links={links} />
			<main className="flex-1 overflow-auto">{children}</main>
		</div>
	);
}
