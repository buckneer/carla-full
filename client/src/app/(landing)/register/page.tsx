"use client";

import type React from "react";

import Link from "next/link";
import { useState } from "react";
import { Car, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		agreeToTerms: false,
		role: "driver", // default
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formData.agreeToTerms) {
			alert("You must agree to the terms.");
			return;
		}

		const res = await fetch("/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: formData.email,
				password: formData.password,
				full_name: formData.name, // send full name
				role: formData.role,
			}),
		});

		const data = await res.json();

		if (!res.ok) {
			alert(data.error || "Registration failed");
		} else {
			alert("Check your email to confirm your account!");
		}
	};

	const handleInputChange = (field: string, value: string | boolean) => {
		setFormData(prev => ({
			...prev,
			[field]: value,
		}));
	};

	return (
		<div className="min-h-screen flex flex-col">
			{/* Main Content */}
			<div className="flex-1 flex items-center justify-center px-4 py-24 bg-gray-50">
				<div className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-sm">
					<div className="p-6 space-y-1">
						<h2 className="text-2xl font-bold text-center">Create your account</h2>
						<p className="text-center text-gray-600">
							Begin your journey with Carla and transform your urban experience
						</p>
					</div>
					<div className="p-6 pt-0">
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<label htmlFor="name" className="text-sm font-medium text-gray-700">
									Full Name
								</label>
								<input
									id="name"
									type="text"
									placeholder="Enter your full name"
									value={formData.name}
									onChange={e => handleInputChange("name", e.target.value)}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="text-sm font-medium text-gray-700"
								>
									Email
								</label>
								<input
									id="email"
									type="email"
									placeholder="Enter your email"
									value={formData.email}
									onChange={e => handleInputChange("email", e.target.value)}
									required
									className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="password"
									className="text-sm font-medium text-gray-700"
								>
									Password
								</label>
								<div className="relative">
									<input
										id="password"
										type={showPassword ? "text" : "password"}
										placeholder="Create a strong password"
										value={formData.password}
										onChange={e =>
											handleInputChange("password", e.target.value)
										}
										required
										className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									/>
									<button
										type="button"
										className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className="h-4 w-4" />
										) : (
											<Eye className="h-4 w-4" />
										)}
									</button>
								</div>
								<p className="text-xs text-gray-500">
									Password must be at least 8 characters long
								</p>
							</div>
							<div className="space-y-2">
								<label htmlFor="role" className="text-sm font-medium text-gray-700">
									Role
								</label>
								<div className="flex items-center space-x-4">
									<button
										type="button"
										onClick={() => handleInputChange("role", "driver")}
										className={`px-4 py-2 rounded-md border ${
											formData.role === "driver"
												? "bg-blue-600 text-white"
												: "bg-gray-100 text-gray-700"
										}`}
									>
										Driver
									</button>
									<button
										type="button"
										onClick={() => handleInputChange("role", "operator")}
										className={`px-4 py-2 rounded-md border ${
											formData.role === "operator"
												? "bg-blue-600 text-white"
												: "bg-gray-100 text-gray-700"
										}`}
									>
										Operator
									</button>
								</div>
							</div>
							<div className="flex items-center space-x-2">
								<input
									id="terms"
									type="checkbox"
									checked={formData.agreeToTerms}
									onChange={e =>
										handleInputChange("agreeToTerms", e.target.checked)
									}
									className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								/>
								<label htmlFor="terms" className="text-sm text-gray-700">
									I agree to the{" "}
									<Link href="#" className="text-blue-600 hover:underline">
										Terms of Service
									</Link>{" "}
									and{" "}
									<Link href="#" className="text-blue-600 hover:underline">
										Privacy Policy
									</Link>
								</label>
							</div>
							<button
								type="submit"
								disabled={!formData.agreeToTerms}
								className="w-full px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-md transition-colors"
							>
								Create Account
							</button>
						</form>
					</div>
					<div className="p-6 pt-0 flex flex-col space-y-4">
						<div className="text-sm text-center text-gray-500">
							Already have an account?{" "}
							<Link href="/login" className="text-blue-600 hover:underline">
								Sign in here
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
