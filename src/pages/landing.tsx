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
	// const router = useRouter();

	// useEffect(() => {
	// 	// Check if the user is already logged in (using a token or a session check)
	// 	const userLoggedIn = false; // Replace this with actual authentication logic
	// 	if (userLoggedIn) {
	// 		// Redirect to the home page if already logged in
	// 		router.push('/home');
	// 	}
	// }, [router]);

	// Placeholder for Google login function
	// const handleGoogleLogin = () => {
	// 	// Add your Google login logic here (use Firebase Auth or any OAuth provider)
	// 	console.log('Google login initiated...');
	// 	// After login success, redirect to home
	// 	router.push('/home');
	// };

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