import "@/styles/globals.css"; // Ensure global styles are imported

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Event, getEvents } from "@/util";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [visibleTasks, setVisibleTasks] = useState(3);
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const fetchedEvents = await getEvents();
            setEvents(fetchedEvents);
        };

        fetchEvents();
    }, []);

    const calculateTimeUntil = (deadline: Date) => {
        const now = new Date();
        const eventDate = new Date(deadline);
        const diffInMs = eventDate.getTime() - now.getTime();
        const diffInHours = Math.ceil(diffInMs / (1000 * 60 * 60));

        if (diffInHours <= 24) {
            return `In ${diffInHours} hours`;
        } else if (diffInHours < 48) {
            return `Tomorrow at ${eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            const diffInDays = Math.ceil(diffInHours / 24);
            return `In ${diffInDays} days`;
        }

        
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                    <p className="text-lg text-gray-600 mb-4">
                        Welcome to your dashboard! Here you can track your tasks, points, and
                        progress.
                    </p>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
                        <span className="text-gray-700 block mb-4">
                            Total Tasks: {events.length}
                        </span>
                        {events.length > 0 ? (
                            <ul className="space-y-4">
                                {events.slice(0, visibleTasks).map((event: Event, index: number) => (
                                    <li key={index} className="border-b pb-4">
                                        <h3 className="font-medium text-lg flex justify-between items-center text-blue-600">
                                            <div>{event.title} </div>
                                            <div>{calculateTimeUntil(event.deadline)}</div>
                                        </h3>
                                        <p className="text-gray-600">{event.description}</p>
                                        <p className="text-sm text-gray-500">
                                            Deadline: {new Date(event.deadline).toLocaleDateString()}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No tasks found. Start adding some!</p>
                        )}
                        {/* add more tasks button */}

                        {events.length > visibleTasks && (
                            <button
                                onClick={() => setVisibleTasks(visibleTasks + 3)}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Show More Tasks
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}