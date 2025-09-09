import React from "react";

function Benefits() {
	return (
		<section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
					<div className="space-y-6">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
								For Drivers
							</h2>
							<p className="text-gray-600 md:text-lg">
								Experience parking the way it should be
							</p>
						</div>
						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
									<span className="text-white text-xs">✓</span>
								</div>
								<div>
									<h4 className="font-semibold">Zero Friction Entry</h4>
									<p className="text-gray-500 text-sm">
										No cards, tickets, or apps to fumble with
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
									<span className="text-white text-xs">✓</span>
								</div>
								<div>
									<h4 className="font-semibold">Instant Recognition</h4>
									<p className="text-gray-500 text-sm">
										System knows you before you stop
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
									<span className="text-white text-xs">✓</span>
								</div>
								<div>
									<h4 className="font-semibold">Seamless Exit</h4>
									<p className="text-gray-500 text-sm">
										Leave when ready, no checkout required
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="space-y-6">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
								For Parking Operators
							</h2>
							<p className="text-gray-600 md:text-lg">
								Transform your facility with intelligent automation
							</p>
						</div>
						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
									<span className="text-white text-xs">✓</span>
								</div>
								<div>
									<h4 className="font-semibold">Automated Access Control</h4>
									<p className="text-gray-500 text-sm">
										Reduce staffing costs and human error
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
									<span className="text-white text-xs">✓</span>
								</div>
								<div>
									<h4 className="font-semibold">Enhanced Security</h4>
									<p className="text-gray-500 text-sm">
										Only authorized vehicles gain access
									</p>
								</div>
							</div>
							<div className="flex items-start space-x-3">
								<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
									<span className="text-white text-xs">✓</span>
								</div>
								<div>
									<h4 className="font-semibold">Real-time Analytics</h4>
									<p className="text-gray-500 text-sm">
										Track usage patterns and optimize operations
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Benefits;
