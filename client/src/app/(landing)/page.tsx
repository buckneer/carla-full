import Link from "next/link";
import {
	Car,
	Star,
	ArrowRight,
	Shield,
	Clock,
	TrendingUp,
	Users,
	Zap,
	CheckCircle,
} from "lucide-react";
import Hero from "@/components/home/Hero";
import SocialProof from "@/components/home/SocialProof";
import HowItWorks from "@/components/home/HowItWorks";
import Benefits from "@/components/home/Benefits";
import Testimonials from "@/components/home/Testimonials";
import Technology from "@/components/home/Technology";
import ROI from "@/components/home/ROI";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";

export default async function LandingPage() {



	return (
		<div className="flex flex-col min-h-screen">
			

			<Hero />
			<SocialProof />
			<HowItWorks />
			<Benefits />
			<Testimonials />
			<Technology />			
			<ROI />
			<FAQ />
			<CTA />			
		</div>
	);
}
