import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

import '@/styles/globals.css';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Landing() {
	return (
		<div className="absolute left-0 right-0 mx-auto">
			<Navbar />
			<Hero />
			<Features />
			<CTA />
			<Footer />
		</div>
	);
};