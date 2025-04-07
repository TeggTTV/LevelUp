import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<div className="w-screen h-14 flex items-center justify-between px-4">
			<Link href="/dashboard" className="text-xl font-bold">LevelUp</Link>

			{/* Hamburger Menu Icon for smaller screens */}
			<div className="lg:hidden flex items-center" onClick={toggleMenu}>
				<button className="text-2xl">☰</button>
			</div>

			{/* Links Container */}
			<div
				className={`flex gap-4 lg:flex lg:items-center ${isMenuOpen
						? // ? 'absolute flex-col top-15 right-4 block text-right pl-4 pb-4 rounded-lg'
						'z-100 absolute w-screen h-full flex-col top-14 left-0 pr-4 text-right block bg-white'
						: 'hidden'
					} lg:block`}
			>
				<Link className="text-lg" href={'/dashboard'}>Dashboard</Link>
				<Link className="text-lg" href={'/calendar'}>Calendar</Link>
				<Link className="text-lg" href={'/leaderboard'}>Leaderboard</Link>
				<Link className="text-lg" href={'/profile'}>Profile</Link>

				<Link className="text-lg" href={'/getting-started'} >
					<button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
						Get Started
					</button>
				</Link>
			</div>
		</div>
	);
}
