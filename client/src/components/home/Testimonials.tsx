import { Star } from "lucide-react";
import React from "react";

function Testimonials() {
	return (
		<section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-white">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						What Our Users Say
					</h2>
					<p className="max-w-[700px] text-gray-600 md:text-lg">
						Real experiences from drivers and parking operators
					</p>
				</div>
				<div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
					<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
						<div className="space-y-4">
							<div className="flex items-center space-x-1">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="h-4 w-4 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>
							<p className="text-gray-600">
								"I never have to worry about finding my parking card anymore. Just
								drive up and the gate opens. It's like magic!"
							</p>
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
									<span className="text-blue-600 text-sm font-semibold">SM</span>
								</div>
								<div>
									<p className="font-semibold text-sm">Sarah M.</p>
									<p className="text-xs text-gray-500">Daily Commuter</p>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
						<div className="space-y-4">
							<div className="flex items-center space-x-1">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="h-4 w-4 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>
							<p className="text-gray-600">
								"Carla reduced our operational costs by 40% and eliminated all the
								issues with lost tickets and card readers."
							</p>
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
									<span className="text-green-600 text-sm font-semibold">DL</span>
								</div>
								<div>
									<p className="font-semibold text-sm">David L.</p>
									<p className="text-xs text-gray-500">Parking Manager</p>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
						<div className="space-y-4">
							<div className="flex items-center space-x-1">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="h-4 w-4 fill-yellow-400 text-yellow-400"
									/>
								))}
							</div>
							<p className="text-gray-600">
								"The system works flawlessly even in bad weather. Our customers love
								the seamless experience."
							</p>
							<div className="flex items-center space-x-2">
								<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
									<span className="text-purple-600 text-sm font-semibold">
										MR
									</span>
								</div>
								<div>
									<p className="font-semibold text-sm">Maria R.</p>
									<p className="text-xs text-gray-500">Facility Owner</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Testimonials;
