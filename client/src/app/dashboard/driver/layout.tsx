// app/dashboard/driver/layout.tsx
import Sidebar from "@/components/common/Sidebar";
import { DashboardRoute } from "@/utils/supabase/types";

export default function DriverLayout({ children }: { children: React.ReactNode }) {
	const links: DashboardRoute[] = [
		{ href: "/dashboard/driver", label: "Dashboard", icon: "Home" },
		{ href: "/dashboard/driver/vehicles", label: "My Vehicles", icon: "Car" },
		{ href: "/dashboard/driver/activity", label: "Activity", icon: "BarChart3" },
		{ href: "/dashboard/driver/settings", label: "Settings", icon: "Settings" },
	];

	return (
		<div className="flex h-screen">
			<Sidebar links={links} />
			<main className="flex-1 overflow-auto">{children}</main>
		</div>
	);
}
