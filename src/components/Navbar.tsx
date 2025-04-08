import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHome, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
	const router = useRouter();
	const currentPath = router.pathname;

	return (
		<nav className="fixed bottom-0 left-0 right-0 bg-white shadow-t-md py-2 px-4">
			<div className="max-w-7xl mx-auto flex justify-around items-center">
				<Link href="/profile">
					<div
						className={`p-2 flex flex-col items-center text-sm ${currentPath === '/profile' ? 'text-blue-600 border-b-2 border-b-blue-500' : 'text-gray-600'
							} hover:text-blue-600 transition-colors`}
					>
						<FontAwesomeIcon icon={faUser} className="text-xl" />
					</div>
				</Link>
				<Link href="/dashboard">
					<div
						className={`p-2 flex flex-col items-center text-sm ${currentPath === '/dashboard' ? 'text-blue-600 border-b-2 border-b-blue-500' : 'text-gray-600'
							} hover:text-blue-600 transition-colors`}
					>
						<FontAwesomeIcon icon={faHome} className="text-xl" />
					</div>
				</Link>
				<Link href="/calendar">
					<div
						className={`p-2 flex flex-col items-center text-sm ${currentPath === '/calendar' ? 'text-blue-600 border-b-2 border-b-blue-500' : 'text-gray-600'
							} hover:text-blue-600 transition-colors`}
					>
						<FontAwesomeIcon icon={faCalendar} className="text-xl" />
					</div>
				</Link>
			</div>
		</nav>
	);
}
