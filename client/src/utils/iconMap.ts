// lib/iconMap.ts
import {
  Home,
  Users,
  BarChart3,
  Settings,
  Car,
  LucideIcon,
} from "lucide-react";
import { IconName } from "./supabase/types";

export const iconMap: Record<IconName, LucideIcon> = {
  Home,
  Users,
  BarChart3,
  Settings,
  Car,
} satisfies Record<IconName, LucideIcon>;
