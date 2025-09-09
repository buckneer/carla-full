import React, { ReactNode } from "react";
import { motion } from "framer-motion";

type ToastType = "success" | "danger" | "warning";

interface ToastProps {
	id: string;
	type: ToastType;
	message: string;
	onClose: (id: string) => void;
}

const ICONS: Record<ToastType, ReactNode> = {
	success: (
		<svg
			className="w-5 h-5"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 20 20"
		>
			<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
		</svg>
	),
	danger: (
		<svg
			className="w-5 h-5"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 20 20"
		>
			<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
		</svg>
	),
	warning: (
		<svg
			className="w-5 h-5"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 20 20"
		>
			<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
		</svg>
	),
};

const COLORS: Record<ToastType, { bg: string; iconBg: string; iconText: string }> = {
	success: { bg: "bg-white", iconBg: "bg-green-100", iconText: "text-green-500" },
	danger: { bg: "bg-white", iconBg: "bg-red-100", iconText: "text-red-500" },
	warning: { bg: "bg-white", iconBg: "bg-orange-100", iconText: "text-orange-500" },
};

const Toast: React.FC<ToastProps> = ({ id, type, message, onClose }) => {
	const color = COLORS[type];

	return (
		<motion.div
			layout
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 50 }}
			transition={{ duration: 0.3 }}
			id={id}
			className={`flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 ${color.bg} rounded-lg shadow-sm`}
			role="alert"
		>
			<div
				className={`inline-flex items-center justify-center shrink-0 w-8 h-8 ${color.iconText} ${color.iconBg} rounded-lg`}
			>
				{ICONS[type]}
				<span className="sr-only">{type.charAt(0).toUpperCase() + type.slice(1)} icon</span>
			</div>
			<div className="ms-3 text-sm font-normal">{message}</div>
			<button
				type="button"
				className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
				onClick={() => onClose(id)}
				aria-label="Close"
			>
				<span className="sr-only">Close</span>
				<svg
					className="w-3 h-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 14"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
					/>
				</svg>
			</button>
		</motion.div>
	);
};

export default Toast;
