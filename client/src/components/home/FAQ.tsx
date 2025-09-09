import React from "react";

function FAQ() {
	return (
		<section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Frequently Asked Questions
					</h2>
					<p className="max-w-[700px] text-gray-600 md:text-lg">
						Everything you need to know about Carla
					</p>
				</div>
				<div className="grid gap-6 lg:grid-cols-2 lg:gap-8 max-w-4xl mx-auto">
					<div className="space-y-4">
						<h3 className="font-semibold">How does the recognition system work?</h3>
						<p className="text-gray-600 text-sm">
							Our advanced visual recognition technology instantly identifies
							registered license plates as vehicles approach, automatically granting
							access to authorized users.
						</p>
					</div>
					<div className="space-y-4">
						<h3 className="font-semibold">
							What if my license plate is dirty or damaged?
						</h3>
						<p className="text-gray-600 text-sm">
							Our system is designed to work in various conditions and can recognize
							plates even when partially obscured. It maintains 99.8% accuracy across
							different weather and lighting conditions.
						</p>
					</div>
					<div className="space-y-4">
						<h3 className="font-semibold">How quickly can the system be installed?</h3>
						<p className="text-gray-600 text-sm">
							Most installations are completed within 24-48 hours with minimal
							disruption to your parking operations. Our team handles everything from
							setup to testing.
						</p>
					</div>
					<div className="space-y-4">
						<h3 className="font-semibold">Is my data secure?</h3>
						<p className="text-gray-600 text-sm">
							Yes, all data is encrypted and stored securely. We comply with all
							privacy regulations and only store the minimum information necessary for
							system operation.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default FAQ;
