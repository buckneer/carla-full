import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

function CTA() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-purple-50 to-blue-50">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
					<div className="space-y-4">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
							Ready to Experience Effortless Parking?
						</h2>
						<p className="text-gray-600 md:text-lg">
							Join thousands of drivers who never worry about parking access again.
							Register your vehicle and discover the future of urban mobility.
						</p>
						<div className="space-x-4">
							<Link href="/register">
								<button className="h-12 px-8 text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-md transition-all duration-200 inline-flex items-center">
									Register Your Vehicle
									<ArrowRight className="ml-2 h-4 w-4" />
								</button>
							</Link>
						</div>
					</div>
					<div className="space-y-4">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
							Transform Your Parking Facility
						</h2>
						<p className="text-gray-600 md:text-lg">
							Reduce costs, enhance security, and provide an exceptional experience
							for your customers. Discover how Carla can revolutionize your
							operations.
						</p>
						<div className="space-x-4">
							<Link href="/login">
								<button className="h-12 px-8 border border-purple-200 text-purple-700 hover:bg-purple-50 rounded-md transition-all duration-200 inline-flex items-center">
									Partner With Us
									<ArrowRight className="ml-2 h-4 w-4" />
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default CTA;
