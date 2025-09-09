"use client";

import React, { createContext, useCallback, useContext, useState, ReactNode } from "react";
import Toast from "@/components/ui/Toast";
import { AnimatePresence } from "framer-motion";

export type ToastType = "success" | "danger" | "warning";
export interface ToastData {
	id: string;
	type: ToastType;
	message: string;
}
interface ToastContextValue {
	addToast: (type: ToastType, message: string, duration?: number) => void;
	removeToast: (id: string) => void;
}
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [toasts, setToasts] = useState<ToastData[]>([]);
	const removeToast = useCallback(
		(id: string) => setToasts(prev => prev.filter(t => t.id !== id)),
		[]
	);
	const addToast = useCallback(
		(type: ToastType, message: string, duration = 5000) => {
			const id = crypto.randomUUID();
			setToasts(prev => [...prev, { id, type, message }]);
			if (duration > 0) setTimeout(() => removeToast(id), duration);
		},
		[removeToast]
	);

	return (
		<ToastContext.Provider value={{ addToast, removeToast }}>
			{children}
			<div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
				<AnimatePresence initial={false}>
					{toasts.map(t => (
						<Toast
							key={t.id}
							id={t.id}
							type={t.type}
							message={t.message}
							onClose={removeToast}
						/>
					))}
				</AnimatePresence>
			</div>
		</ToastContext.Provider>
	);
};

export const useToast = (): ToastContextValue => {
	const ctx = useContext(ToastContext);
	if (!ctx) throw new Error("useToast must be used within ToastProvider");
	return ctx;
};
