import '@/styles/globals.css'; // Ensure global styles are imported

import Navbar from '@/components/Navbar';
import { Event, getEvents, deleteEvent } from '@/utils/util';
import { useEffect, useState } from 'react';

export default function Dashboard() {
    const [events, setEvents] = useState<Event[]>([]);
    const [deletingEvents, setDeletingEvents] = useState<Set<number>>(new Set());
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [eventToDelete, setEventToDelete] = useState<{ event: Event, index: number } | null>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
    };

    const initiateDelete = (event: Event, index: number) => {
        setEventToDelete({ event, index });
        setShowConfirmModal(true);
    };

    const confirmDelete = () => {
        if (!eventToDelete) return;

        // Mark this event as being deleted (for animation)
        setDeletingEvents(prev => new Set(prev).add(eventToDelete.index));

        // Wait for animation to complete before actual deletion
        setTimeout(() => {
            deleteEvent(eventToDelete.event);
            setDeletingEvents(prev => {
                const updated = new Set(prev);
                updated.delete(eventToDelete.index);
                return updated;
            });
            fetchEvents(); // Refresh events list
        }, 500); // Match animation duration

        // Close the modal
        setShowConfirmModal(false);
        setEventToDelete(null);
    };

    const cancelDelete = () => {
        setShowConfirmModal(false);
        setEventToDelete(null);
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold mb-6">Welcome User 🎉</h1>

                    {/* Event Display Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {events.map((event: Event, index: number) => (
                            <div
                                key={index}
                                className={`p-6 bg-white rounded-lg shadow-md border-l-4 relative transition-all duration-500 ease-in-out ${deletingEvents.has(index)
                                        ? 'opacity-0 transform translate-y-10'
                                        : 'opacity-100'
                                    }`}
                                style={{
                                    borderColor: event.tagColor || 'gray',
                                }}
                            >
                                <button
                                    className="absolute top-2 right-2 text-gray-300 hover:text-red-500 text-sm p-1 rounded-full"
                                    onClick={() => initiateDelete(event, index)}
                                    aria-label="Delete event"
                                >
                                    ✕
                                </button>
                                <h2 className="text-xl font-bold mb-2">{event.title}</h2>
                                <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                                <div className="text-sm text-gray-500 mb-2">
                                    <span>
                                        {new Date(event.startTime).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })} - {new Date(event.endTime).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    {event.tagColor ? (
                                        <span
                                            className={`px-3 py-1 text-sm rounded-full`}
                                            style={{
                                                backgroundColor: event.tagColor || 'gray',
                                                color: ['yellow', 'lightyellow', 'lightgoldenrodyellow'].includes(event.tagColor.toLowerCase())
                                                    ? 'black' // Use dark text for light backgrounds
                                                    : 'white', // Use white text for dark backgrounds
                                            }}
                                        >
                                            {event.tagName || 'No Tag'}
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl transform transition-all duration-300 ease-in-out">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Confirm Deletion</h3>
                        <p className="text-gray-500 mb-4">
                            Are you sure you want to delete &quot;{eventToDelete?.event.title}&quot;? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                                onClick={cancelDelete}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
