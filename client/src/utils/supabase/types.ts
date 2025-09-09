import { IconNode, LucideIcon } from "lucide-react";

// Database types
export interface User {
	id: string;
	email: string;
	full_name?: string;
	phone?: string;
	role: "driver" | "operator" | "admin";
	avatar_url?: string;
	created_at: string;
	updated_at: string;
}

export interface Vehicle {
	id: string;
	user_id: string;
	license_plate: string;
	make: string;
	model: string;
	year: number;
	color: string;
	status: "pending" | "active" | "inactive" | "rejected";
	approved_by?: string;
	approved_at?: string;
	created_at: string;
	updated_at: string;
}

export interface Facility {
	id?: string;
	name: string;
	address: string;
	contact_email?: string;
	contact_phone?: string;
	operator_id: string;
	hourly_rate: number;
	daily_max_rate: number;
	monthly_rate: number;
	recognition_sensitivity: string;
	auto_approval: boolean;
	max_vehicles_per_user: number;
	created_at: string;
	updated_at: string;
}

export interface UserFacility {
	id: string;
	user_id: string;
	facility_id: string;
	role: "operator" | "driver";
	status: "active" | "inactive" | "pending" | "rejected";
	approved_by?: string;
	approved_at?: string;
	created_at: string;
	updated_at: string;
}

export interface ParkingSession {
	id: string;
	vehicle_id: string;
	facility_id: string;
	entry_time: string;
	exit_time?: string;
	duration_minutes?: number;
	cost?: number;
	status: "active" | "completed" | "cancelled";
	gate_entry?: string;
	gate_exit?: string;
	created_at: string;
	updated_at: string;
}

export interface UserSettings {
	id: string;
	user_id: string;
	email_notifications: boolean;
	sms_notifications: boolean;
	push_notifications: boolean;
	entry_exit_alerts: boolean;
	payment_alerts: boolean;
	share_usage_data: boolean;
	allow_location_tracking: boolean;
	auto_payment: boolean;
	default_vehicle_id?: string;
	language: string;
	timezone: string;
	created_at: string;
	updated_at: string;
}

export type IconName = "Home" | "Users" | "BarChart3" | "Settings" | "Car";

export interface DashboardRoute {
	href: string;
	label: string;
	icon: IconName;
}



export type DeviceEvent = {
	id: string;
	device_id?: string | null;
	payload?: any;
	received_at?: string | null;
	vehicle_id?: string | null;
};

export type VehicleStats = {
  vehicle_id: string;
  total_entries: number;
  total_exits: number;
  last_used: string | null;
  recent_activity: DeviceEvent[]; // array of DeviceEvent rows
  raw_count?: number;
};


export type VehicleWithStats = Vehicle & {
  stats: {
    total_entries: number;
    total_exits: number;
    last_used: string | null;
    recent_activity: DeviceEvent[];
    raw_count?: number;
  };
};