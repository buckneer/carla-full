"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Car, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [accountType, setAccountType] = useState<"driver" | "operator">("driver");
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const res = await fetch("/api/auth/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
		const body = await res.json();

		if (!res.ok) {
			setError(body.error);
			return;
		}

		// body.role comes from your API
		const role: "driver" | "operator" = body.role;

		// redirect based on role
		if (role === "driver") {
			router.push("/dashboard/driver");
		} else {
			router.push("/dashboard/operator");
		}
	};

	return (
		<div className="min-h-screen flex flex-col">
			<div className="flex-1 flex items-center justify-center bg-gray-50">
				<form
					onSubmit={handleSubmit}
					className="w-full max-w-md bg-white p-6 rounded-lg shadow-sm space-y-4"
				>
					<h2 className="text-2xl font-bold text-center">Welcome back</h2>

					{/* Email & Password */}
					<div>
						<label htmlFor="email" className="text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							id="email"
							type="email"
							required
							value={email}
							onChange={e => setEmail(e.target.value)}
							className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label htmlFor="password" className="text-sm font-medium text-gray-700">
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? "text" : "password"}
								required
								value={password}
								onChange={e => setPassword(e.target.value)}
								className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 px-3 flex items-center"
								onClick={() => setShowPassword(v => !v)}
							>
								{showPassword ? <EyeOff /> : <Eye />}
							</button>
						</div>
					</div>

					{error && <p className="text-red-600 text-sm">{error}</p>}

					<button className="w-full py-2 bg-blue-600 text-white rounded-md">
						Sign In
					</button>

					<p className="text-center text-sm text-gray-500">
						Don’t have an account?{" "}
						<Link href="/register" className="text-blue-600 hover:underline">
							Sign up here
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}
