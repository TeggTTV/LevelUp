import Navbar from '@/components/Navbar';
import '@/styles/globals.css';

export default function GettingStarted() {
	return (
		<>
			<Navbar />
			<div className="text-center py-10 px-4">
				<h1 className="text-4xl font-bold">Getting Started</h1>
				<p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
					Welcome to LevelUp! Let&apos;s walk you through the basics so you
					can start crushing your goals and earning rewards.
				</p>
			</div>

			<div className="grid md:grid-cols-3 gap-6 px-6 py-10">
				<div className="bg-white p-6 rounded-xl shadow-lg text-center">
					<h2 className="text-2xl font-semibold">1. Create a Task</h2>
					<p className="mt-2 text-gray-600">
						Add your first task and set a reminder using natural
						language like “Math test tomorrow at 3pm”.
					</p>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-lg text-center">
					<h2 className="text-2xl font-semibold">2. Earn Points</h2>
					<p className="mt-2 text-gray-600">
						Complete tasks to earn points and climb the leaderboard!
					</p>
				</div>

				<div className="bg-white p-6 rounded-xl shadow-lg text-center">
					<h2 className="text-2xl font-semibold">
						3. Track Your Progress
					</h2>
					<p className="mt-2 text-gray-600">
						Check your dashboard for your recent tasks, scores, and
						streaks.
					</p>
				</div>
			</div>
		</>
	);
}
