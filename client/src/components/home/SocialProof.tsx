import React from "react";

function SocialProof() {
	return (
		<section className="w-full py-8 bg-white border-b">
			<div className="container mx-auto px-4 md:px-6">
				<div className="flex flex-col items-center space-y-4">
					<p className="text-sm text-gray-500">Trusted by leading parking facilities</p>
					<div className="flex items-center justify-center gap-8 opacity-60">
						<div className="text-lg font-bold text-gray-400">WESTFIELD</div>
						<div className="text-lg font-bold text-gray-400">CITYPARK</div>
						<div className="text-lg font-bold text-gray-400">METRO LOTS</div>
						<div className="text-lg font-bold text-gray-400">PARKTECH</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SocialProof;
