import React from "react";

function Technology() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-8 text-center">
					<div className="space-y-4">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Powered by Intelligence
						</h2>
						<p className="max-w-[800px] text-gray-300 md:text-xl/relaxed">
							Cutting-edge recognition technology meets elegant simplicity. Our system
							learns, adapts, and improves with every interaction.
						</p>
					</div>
					<div className="grid gap-6 md:grid-cols-4 max-w-4xl w-full">
						<div className="text-center">
							<div className="text-3xl font-bold text-green-400">99.8%</div>
							<div className="text-sm text-gray-300">Recognition Accuracy</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-blue-400">{"<2s"}</div>
							<div className="text-sm text-gray-300">Average Processing Time</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-purple-400">24/7</div>
							<div className="text-sm text-gray-300">Autonomous Operation</div>
						</div>
						<div className="text-center">
							<div className="text-3xl font-bold text-yellow-400">50+</div>
							<div className="text-sm text-gray-300">Active Locations</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Technology;
