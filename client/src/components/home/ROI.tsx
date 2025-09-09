import { Clock, Shield, TrendingUp, Users } from "lucide-react";
import React from "react";

function ROI() {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-white">
			<div className="container mx-auto px-4 md:px-6">
				<div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
					<div className="space-y-6">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
								Proven ROI for Operators
							</h2>
							<p className="text-gray-600 md:text-lg">
								See measurable results from day one with reduced costs and improved
								efficiency
							</p>
						</div>
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<TrendingUp className="h-5 w-5 text-green-500" />
									<span className="font-semibold">40% Cost Reduction</span>
								</div>
								<p className="text-sm text-gray-500">
									Lower staffing and maintenance costs
								</p>
							</div>
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<Clock className="h-5 w-5 text-blue-500" />
									<span className="font-semibold">85% Faster Entry</span>
								</div>
								<p className="text-sm text-gray-500">
									Reduced wait times and congestion
								</p>
							</div>
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<Shield className="h-5 w-5 text-purple-500" />
									<span className="font-semibold">Zero Security Breaches</span>
								</div>
								<p className="text-sm text-gray-500">
									Enhanced access control and monitoring
								</p>
							</div>
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<Users className="h-5 w-5 text-orange-500" />
									<span className="font-semibold">95% User Satisfaction</span>
								</div>
								<p className="text-sm text-gray-500">
									Improved customer experience
								</p>
							</div>
						</div>
					</div>
					<div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
						<div className="space-y-6">
							<h3 className="text-2xl font-bold">Calculate Your Savings</h3>
							<div className="space-y-4">
								<div className="flex justify-between items-center">
									<span className="text-gray-600">Monthly staffing costs</span>
									<span className="font-semibold">$8,000</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600">Maintenance & repairs</span>
									<span className="font-semibold">$1,200</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="text-gray-600">
										Lost revenue (tickets/cards)
									</span>
									<span className="font-semibold">$800</span>
								</div>
								<hr className="border-gray-300" />
								<div className="flex justify-between items-center text-lg font-bold">
									<span>Potential Monthly Savings</span>
									<span className="text-green-600">$4,000</span>
								</div>
							</div>
							<button className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
								Get Custom ROI Analysis
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ROI;
