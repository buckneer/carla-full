import { ArrowRight, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

function Hero() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative overflow-hidden">
			<div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
			<div className="container mx-auto px-4 md:px-6 relative">
				<div className="flex flex-col items-center space-y-4 text-center">
					<div className="inline-flex items-center rounded-full border px-3 py-1 text-xs bg-white/50 backdrop-blur-sm">
						<Zap className="h-3 w-3 mr-1 text-yellow-500" />
						Now live in 50+ parking facilities
					</div>
					<div className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
							Drive In. Drive Out. Done.
						</h1>
						<p className="mx-auto max-w-[700px] text-gray-600 md:text-xl lg:text-2xl">
							No cards. No apps. No waiting. Carla's intelligent recognition system
							knows you're coming before you arrive.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-4">
						<Link href="/register">
							<button className="h-12 px-8 text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-md transition-all duration-200 flex items-center">
								Register Your Vehicle
								<ArrowRight className="ml-2 h-4 w-4" />
							</button>
						</Link>
						<Link href="/login">
							<button className="h-12 px-8 border border-purple-200 text-purple-700 hover:bg-purple-50 rounded-md transition-all duration-200">
								For Parking Operators
							</button>
						</Link>
					</div>
					<div className="flex items-center gap-6 text-sm text-gray-500 mt-8">
						<div className="flex items-center gap-1">
							<CheckCircle className="h-4 w-4 text-green-500" />
							Free to register
						</div>
						<div className="flex items-center gap-1">
							<CheckCircle className="h-4 w-4 text-green-500" />
							Instant activation
						</div>
						<div className="flex items-center gap-1">
							<CheckCircle className="h-4 w-4 text-green-500" />
							Works everywhere
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
