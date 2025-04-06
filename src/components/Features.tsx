import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faComputer, faGift } from '@fortawesome/free-solid-svg-icons';

export default function Features() {
	return (
		<>
			<div className="left-0 right-0 mx-auto px-4 py-12 bg-white max-w-md lg:max-w-xl">
				<div className="text-center">
					<h2 className="text-3xl font-semibold">Features</h2>
					<p className="mt-2 text-xl text-gray-600">
						Check out the amazing features that will help you stay
						on top of your game.
					</p>
				</div>
				<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="text-center p-3 rounded-xl">
						<FontAwesomeIcon
							className="bg-blue-100 p-2 rounded-full text-blue-600"
							icon={faBell}
						/>
						<h3 className="text-xl font-semibold">
							Smart Task Reminders
						</h3>
						<p className="mt-2 text-gray-600">
							Never forget an important task with automatic
							reminders.
						</p>
					</div>
					<div className="text-center p-3 rounded-xl">
						<FontAwesomeIcon
							className="bg-blue-100 p-2 rounded-full text-blue-600"
							icon={faGift}
						/>

						<h3 className="text-xl font-semibold">
							Rewards System
						</h3>
						<p className="mt-2 text-gray-600">
							Earn points for completing tasks and stay motivated!
						</p>
					</div>
					<div className="text-center p-3 rounded-xl">
						<FontAwesomeIcon
							className="bg-blue-100 p-2 rounded-full text-blue-600"
							icon={faComputer}
						/>
						<h3 className="text-xl font-semibold">
							Simple, Clean UI
						</h3>
						<p className="mt-2 text-gray-600">
							Designed to help you stay focused and productive.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
