import React from "react";

// Icon components imported from your icon library
import { Users, Car, Activity, TrendingUp } from "lucide-react";

// Configuration for the four fixed color themes
const colorConfig = {
	blue: {
		gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
		textLight: "text-blue-100",
	},
	green: {
		gradient: "bg-gradient-to-br from-green-500 to-green-600",
		textLight: "text-green-100",
	},
	purple: {
		gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
		textLight: "text-purple-100",
	},
	orange: {
		gradient: "bg-gradient-to-br from-orange-500 to-orange-600",
		textLight: "text-orange-100",
	},
} as const;

type ColorKey = keyof typeof colorConfig;

interface StatCardProps {
	title: string;
	value: string | number;
	changeText: string;
	Icon: React.ComponentType<{ className?: string }>;
	color: ColorKey;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, changeText, Icon, color }) => {
	const { gradient, textLight } = colorConfig[color];

	return (
		<div className={`${gradient} rounded-xl p-6 text-white`}>
			<div className="flex items-center justify-between">
				<div>
					<p className={`${textLight} text-sm font-medium`}>{title}</p>
					<p className="text-3xl font-bold mt-1">
						{typeof value === "number" ? value.toLocaleString() : value}
					</p>
					<p className={`${textLight} text-sm mt-2`}>{changeText}</p>
				</div>
				<div className="p-3 bg-white/20 rounded-lg">
					<Icon className="h-8 w-8" />
				</div>
			</div>
		</div>
	);
};
