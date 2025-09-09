"use client";

import React from "react";
import { useWidth } from "@/hooks/useWidth";
import DesktopSidebar from "./DesktopSidebar";
import MobileSidebar from "./MobileSidebar";
import { DashboardRoute } from "@/utils/supabase/types";

interface SidebarProps {
	links: DashboardRoute[]
}

export default function Sidebar({ links }: SidebarProps) {
	const regular = useWidth();

	return regular ? <DesktopSidebar links={links} /> : <MobileSidebar links={links} />
}
