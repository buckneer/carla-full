// components/AuthContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/utils/supabase/types";

type AuthContextType = {
	user: User // you can refine this to Supabase's User type
	// role: "driver" | "operator" | null;
	loading: boolean;
	signIn: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	refreshUser: () => Promise<void>;
};

// Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server.

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const router = useRouter();
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	// 1) Load initial session & role
	useEffect(() => {
		const init = async () => {
			const res = await fetch("/api/auth/session");
			const { user, role } = await res.json();
			setUser(user);
			setLoading(false);
		};
		init();
	}, []);

	const signIn = async (email: string, password: string) => {
		setLoading(true);
		const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
			credentials: "include",
		});
		if (!res.ok) {
			const { error } = await res.json();
			setLoading(false);
			throw new Error(error || "Login failed");
		}
		// Refresh context from server
		const sess = await fetch("/api/auth/session");
		const { user } = await sess.json();
		setUser(user);
		setLoading(false);
	};

	const signOut = async () => {
		setLoading(true);
		// call your logout route to clear HttpOnly cookie
		await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
		setUser(null);
		setLoading(false);
		router.push("/login");
	};

	const refreshUser = async () => {
		setLoading(true);
		const res = await fetch("/api/auth/session");
		const { user } = await res.json();
		console.log(user);
		setUser(user);
		setLoading(false);
	};

	return (
		<AuthContext.Provider value={{ user, loading, signIn, signOut, refreshUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
