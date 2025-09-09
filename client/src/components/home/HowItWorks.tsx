import React from "react";

function HowItWorks() {
	return (
		<section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-white">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Effortless Access
					</h2>
					<p className="max-w-[700px] text-gray-600 md:text-lg">
						Advanced recognition technology that works seamlessly in the background
					</p>
				</div>
				<div className="grid gap-8 lg:grid-cols-3 lg:gap-12 items-start">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="relative">
							<div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
								<div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full"></div>
							</div>
							<div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
								<span className="text-white text-xs font-bold">1</span>
							</div>
						</div>
						<div className="space-y-2">
							<h3 className="text-xl font-bold">Approach</h3>
							<p className="text-gray-500">
								Simply drive up to any Carla-enabled parking facility. Our
								intelligent system detects your arrival.
							</p>
						</div>
					</div>
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="relative">
							<div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
								<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full"></div>
							</div>
							<div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
								<span className="text-white text-xs font-bold">2</span>
							</div>
						</div>
						<div className="space-y-2">
							<h3 className="text-xl font-bold">Recognition</h3>
							<p className="text-gray-500">
								Advanced visual recognition instantly identifies registered vehicles
								without any action required.
							</p>
						</div>
					</div>
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="relative">
							<div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full flex items-center justify-center">
								<div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-full"></div>
							</div>
							<div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
								<span className="text-white text-xs font-bold">3</span>
							</div>
						</div>
						<div className="space-y-2">
							<h3 className="text-xl font-bold">Access</h3>
							<p className="text-gray-500">
								Barriers open automatically. Drive in, park, and leave whenever
								you're ready. It's that simple.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HowItWorks;
