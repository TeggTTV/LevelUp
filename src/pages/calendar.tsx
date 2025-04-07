import { useCallback, useEffect, useMemo, useState } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import { addEvent, deleteEvent, editEvent, Event, getEvents } from '@/util';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Calendar() {
	// ✅ All hooks are at the top level
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());
	const [hasMounted, setHasMounted] = useState(false);

	const [showModal, setShowModal] = useState(false);
	const [newTitle, setNewTitle] = useState('');
	const [newDesc, setNewDesc] = useState('');
	const [newTime, setNewTime] = useState('');

	const [editingIdx, setEditingIdx] = useState<number | null>(null);
	const [editTitle, setEditTitle] = useState('');
	const [editDesc, setEditDesc] = useState('');
	const [editTime, setEditTime] = useState('');


	useEffect(() => {
		// Delay rendering to avoid hydration issues
		setHasMounted(true);
	}, []);

	const display = useMemo(() => {
		const current = new Date(year, month);
		return current.toLocaleString('en-US', {
			month: 'long',
			year: 'numeric',
		});
	}, [year, month]);

	const days = useMemo(() => {
		const firstDay = new Date(year, month, 1);
		const firstDayIndex = firstDay.getDay();
		const lastDay = new Date(year, month + 1, 0);
		const numberOfDays = lastDay.getDate();

		const placeholders = Array.from({ length: firstDayIndex }, () => null);
		const actualDays = Array.from({ length: numberOfDays }, (_, i) => new Date(year, month, i + 1));

		return [...placeholders, ...actualDays];
	}, [year, month]);

	const goBackMonth = () => {
		if (month === 0) {
			setMonth(11);
			setYear((prev) => prev - 1);
		} else {
			setMonth((prev) => prev - 1);
		}
	};

	const goForwardMonth = () => {
		if (month === 11) {
			setMonth(0);
			setYear((prev) => prev + 1);
		} else {
			setMonth((prev) => prev + 1);
		}
	};

	const isToday = useCallback((date: Date) => {
		const now = new Date();
		return (
			date.getDate() === now.getDate() &&
			date.getMonth() === now.getMonth() &&
			date.getFullYear() === now.getFullYear()
		);
	}, []);

	const isSelected = useCallback(
		(date: Date) => date.toDateString() === selectedDate.toDateString(),
		[selectedDate]
	);

	const hasEvent = useCallback((date: Date) => {
		return getEvents(date).length > 0;
	}, []);


	// ✅ Render only after mount to prevent mismatch
	if (!hasMounted) return null;

	return (
		<>
			<Navbar />
			<div className="left-0 right-0 mx-auto w-screen max-w-sm h-screen p-4">
				<div className="calendar bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
					<header className="flex justify-between items-center">
						<pre
							className="cursor-pointer text-2xl text-blue-500"
							onClick={goBackMonth}
						>
							◀
						</pre>
						<p className="text-blue-500 m-2 text-lg">{display}</p>
						<pre
							className="cursor-pointer text-2xl text-blue-500"
							onClick={goForwardMonth}
						>
							▶
						</pre>
					</header>

					<div className="grid grid-cols-7 mt-2 text-lg">
						{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
							<div key={d} className="justify-self-center w-8 h-8 flex items-center justify-center opacity-50 rounded-full">
								{d}
							</div>
						))}
					</div>

					<div className="grid grid-cols-7 gap-1 mt-1">
						{days.map((day, index) => (
							<div
								key={index}
								className={`relative w-8 h-8 rounded-full flex items-center justify-center cursor-pointer justify-self-center self-center
		${day
										? isToday(day)
											? 'bg-blue-500 text-white'
											: isSelected(day)
												? 'bg-blue-500/30 rounded-sm'
												: ''
										: ''}`}
								onClick={() => {
									if (day) {
										setEditingIdx(null); // Close any open edit mode
										if (isSelected(day)) {
											setSelectedDate(new Date()); // Unselect by setting to current day
										} else {
											setSelectedDate(day);
										}
									}
								}}
							>
								{day ? day.getDate() : ''}
								{day && hasEvent(day) && (
									<span className="absolute bottom-0 w-1.5 h-1.5 bg-blue-500 rounded-full" />
								)}
							</div>

						))}
					</div>
				</div>

				<div
					className="w-full my-4 py-3 bg-blue-500 text-white text-lg flex items-center justify-center rounded-xl shadow-md hover:bg-blue-600 transition cursor-pointer"
					onClick={() => {
						setShowModal(true);
					}}
				>
					<FontAwesomeIcon icon={faPlus} />
				</div>

				<div className="w-full mt-4 max-h-[300px] overflow-y-auto space-y-2 pr-1">
					{getEvents(selectedDate).map((e: Event, idx: number) => {

						const handleEditClick = (event: Event, index: number): void => {
							// if already editing, close the current edit
							if (editingIdx === index) {
								setEditingIdx(null);
								return;
							}
							setEditingIdx(index);
							setEditTitle(event.title);
							setEditDesc(event.description);
							setEditTime(new Date(event.deadline).toTimeString().slice(0, 5)); // "HH:MM"
						};

						const handleSaveEdit = (oldEvent: Event): void => {
							const newEvent: Partial<Event> = {
								title: editTitle,
								description: editDesc,
								deadline: new Date(selectedDate.setHours(
									parseInt(editTime.split(':')[0]),
									parseInt(editTime.split(':')[1])
								)),
							};
							editEvent({ ...oldEvent, ...newEvent });
							setEditingIdx(null);
						};

						return (
							<div
								key={idx}
								className="w-full p-4 bg-white shadow-xl rounded-lg transition duration-75 focus:scale-[1.01] hover:shadow-2xl"

							>
								<div onClick={() => handleEditClick(e, idx)} className="text-lg font-semibold flex justify-between">
									<div>{e.title}</div>
									<div>{new Date(e.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
								</div>
								<div className="text-md text-gray-600 mt-2">{e.description}</div>

								{editingIdx === idx && (
									<div className="mt-4 space-y-2">
										<label className="p-2 text-sm font-medium text-gray-700">
											Edit Title
										</label>
										<input
											className="w-full border rounded p-2"
											placeholder="Edit title"
											value={editTitle}
											onChange={(e) => setEditTitle(e.target.value)}
										/>
										<label className="p-2 text-sm font-medium text-gray-700">
											Description
											<textarea
												className="w-full border rounded p-2"
												placeholder="Edit description"
												value={editDesc}
												onChange={(e) => setEditDesc(e.target.value)}
											/>
										</label>
										<label className="p-2 text-sm font-medium text-gray-700">
											Time
										</label>
										<input
											type="time"
											placeholder="Edit time"
											className="w-full border rounded p-2 mb-4"
											value={editTime}
											onChange={(e) => setEditTime(e.target.value)}
										/>
										<div className="flex justify-between">
											<button
												className="text-blue-500 border border-blue-500 px-4 py-1 rounded"
												onClick={() => setEditingIdx(null)}
											>
												Cancel
											</button>
											{/* Delete Button */}
											<button
												className="bg-red-500 text-white px-4 py-1 rounded"
												onClick={() => {
													deleteEvent(e);  // Call your deleteEvent function here
													setEditingIdx(null);  // Close the edit mode after deleting
												}}
											>
												Delete
											</button>
											<button
												className="bg-blue-500 text-white px-12 py-1 rounded"
												onClick={() => handleSaveEdit(e)}
											>
												Save
											</button>

										</div>
									</div>
								)}

							</div>
						);
					})}

				</div>
			</div>
			{showModal && (
				<div
					className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
					onClick={() => setShowModal(false)}
				>
					<div
						className="bg-white rounded-2xl p-6 w-80 space-y-2 shadow-xl"
						onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
					>
						<h2 className="text-xl font-bold text-blue-500">New Event</h2>
						<p className="text-sm text-gray-600 mb-4">Add an event for {selectedDate.toLocaleDateString()}</p>

						{/* Title, Description and Time Inputs */}

						<label className="p-2 text-sm font-medium text-gray-700 mb-1">
							Title
						</label>
						<input
							type="text"
							placeholder="Title"
							value={newTitle}
							onChange={(e) => setNewTitle(e.target.value)}
							className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<label className="p-2 text-sm font-medium text-gray-700">
							Description
						</label>
						<textarea
							placeholder="Description"
							value={newDesc}
							onChange={(e) => setNewDesc(e.target.value)}
							className="w-full mb-0 border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<label className="p-2 text-sm font-medium text-gray-700">
							Time
						</label>
						<input
							type="time"
							placeholder="Select time"
							value={newTime}
							onChange={(e) => setNewTime(e.target.value)}
							className="w-full border rounded mb-4 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<div className="flex justify-between">
							<button
								className="text-blue-500 border border-blue-500 px-4 py-2 rounded"
								onClick={() => setShowModal(false)}
							>
								Cancel
							</button>
							<button
								className="text-white bg-blue-500 px-4 py-2 rounded"
								onClick={() => {
									// 🔧 Add logic here to save the event
									addEvent(
										selectedDate,
										newTitle.trim() || 'Untitled Event', // Default title if empty
										newDesc.trim() || 'No description provided', // Default description if empty
										newTime ? new Date(selectedDate.setHours(parseInt(newTime.split(':')[0]), parseInt(newTime.split(':')[1]))) : new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(), 0, 0, 0) // Default time if empty (midnight)
									);

									setShowModal(false);
									setNewTitle('');
									setNewDesc('');
									setNewTime('');
								}}
							>
								Save
							</button>
						</div>
					</div>
				</div>
			)}

			<Footer />
		</>
	);
}
