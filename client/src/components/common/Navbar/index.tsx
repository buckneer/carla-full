import { Car } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
	return (
		<header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/95 backdrop-blur-md fixed w-full top-0 z-50 shadow-sm">
			<Link href="/" className="flex items-center justify-center">
				<div className="relative">
					<Car className="h-8 w-8 text-blue-600" />
				</div>
				<span className="ml-2 text-xl font-bold text-gray-900">Carla</span>
			</Link>

			<nav className="hidden md:flex ml-8 gap-8">
				<Link
					href="#how-it-works"
					className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
				>
					How It Works
				</Link>
				<Link
					href="#benefits"
					className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
				>
					Benefits
				</Link>
				<Link
					href="#testimonials"
					className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
				>
					Reviews
				</Link>
				<Link
					href="#faq"
					className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
				>
					FAQ
				</Link>
			</nav>

			<div className="ml-auto flex items-center gap-4">
				<Link
					href="/login"
					className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
				>
					Sign In
				</Link>
				<Link href="/register">
					<button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-md transition-all duration-200">
						Get Started
					</button>
				</Link>
			</div>
		</header>
	);
};

export default Navbar;
