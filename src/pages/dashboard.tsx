import '@/styles/globals.css'; // Ensure global styles are imported

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Event, getEvents } from '@/util';
import { useEffect, useState } from 'react';

export default function Dashboard() {
	const [events, setEvents] = useState<Event[]>([]);

	useEffect(() => {
		const fetchEvents = async () => {
			const fetchedEvents = await getEvents();
			setEvents(fetchedEvents);
		};

		fetchEvents();
	}, []);

	return (
		<>
			<Navbar />
			<div className="min-h-screen bg-gray-100">
				<div className="max-w-7xl mx-auto px-4 py-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{events.map((event: Event, index: number) => (
							<div
								key={index}
								className="p-6 bg-white rounded-lg shadow-md border-l-4"
								style={{
									borderColor: event.tagColor || 'gray',
								}}
							>
								<h2 className="text-xl font-bold mb-2">
									{event.title}
								</h2>
								<p className="text-sm text-gray-600 mb-4">
									{event.description}
								</p>
								<div className="flex justify-between items-center">
									{event.tagColor ? (
										<span
											className={`px-3 py-1 text-sm rounded-full`}
											style={{
												backgroundColor:
													event.tagColor || 'gray',
												color: 'white',
											}}
										>
											{event.tagName || 'No Tag'}
										</span>
									) : (
										''
									)}

									<span className="text-gray-500 text-sm">
										{new Date(
											event.deadline
										).toLocaleString([], {
											weekday: 'long',
											month: 'short',
											day: 'numeric',
											hour: '2-digit',
											minute: '2-digit',
										})}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
