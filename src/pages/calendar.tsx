/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo, useState } from 'react';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import {
	addEvent,
	editEvent,
	Event,
	getEvents,
	getTags,
	Tag,
	deleteTag,
} from '@/utils/util';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';
import {
	goBackMonth,
	goForwardMonth,
	isToday,
	isSelected,
	hasEvent,
	getEventColors,
	handleColorClick,
	handleTagClick,
	handleAddTag,
	handleEditClick,
	handleModalClose,
	handleTagModalClose,
} from '@/utils/calendarHandlers';
import CalendarHeader from '@/components/CalendarHeader';
import DaysGrid from '@/components/DaysGrid';
import EventsList from '@/components/EventsList';
import { faArrowRight, faClose, faLeftRight, faPencil, faPencilSquare, faRightLong } from '@fortawesome/free-solid-svg-icons';

export default function Calendar() {
	// ✅ All hooks are at the top level
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [month, setMonth] = useState(new Date().getMonth());
	const [year, setYear] = useState(new Date().getFullYear());
	const [hasMounted, setHasMounted] = useState(false);

	const [showModal, setShowModal] = useState(false);
	const [newTitle, setNewTitle] = useState('');
	const [newDesc, setNewDesc] = useState('');
	// Replace single time with start and end times
	const [newStartTime, setNewStartTime] = useState('');
	const [newEndTime, setNewEndTime] = useState('');

	const [editingIdx, setEditingIdx] = useState<number | null>(null);

	const [tags, setTags] = useState<Tag[]>([]);
	const [newTagName, setNewTagName] = useState('');
	const [selectedTagColors, setSelectedTagColors] = useState<string[]>([]);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

	const [isEditing, setIsEditing] = useState(false);
	const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

	const [isEditingTags, setIsEditingTags] = useState(false);
	const [showTagModal, setShowTagModal] = useState(false);

	const [showDeleteTagModal, setShowDeleteTagModal] = useState(false);
	const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);

	useEffect(() => {
		// Delay rendering to avoid hydration issues
		setHasMounted(true);
		let tags = getTags();
		if (!tags.length) {
			tags = [
				{ name: 'Work', color: 'blue' },
				{ name: 'Personal', color: 'green' },
				{ name: 'Urgent', color: 'red' },
			];
			localStorage.setItem('tags', JSON.stringify(tags));
		}
		setTags(tags);
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
		const lastDayIndex = lastDay.getDay();

		// Calculate placeholders for the start and end of the month
		const startPlaceholders = Array.from({ length: firstDayIndex }, () => null);
		const endPlaceholders = Array.from({ length: 6 - lastDayIndex }, () => null);

		const actualDays = Array.from(
			{ length: numberOfDays },
			(_, i) => new Date(year, month, i + 1)
		);

		return [...startPlaceholders, ...actualDays, ...endPlaceholders];
	}, [year, month]);

	// ✅ Render only after mount to prevent mismatch
	if (!hasMounted) return null;

	return (
		<>
			<Navbar />
			<div className="left-0 right-0 mx-auto w-screen max-w-sm h-screen p-4">
				<div className="calendar bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
					<CalendarHeader
						display={display}
						month={month}
						setMonth={setMonth}
						setYear={setYear}
					/>
					<DaysGrid
						days={days}
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
						isToday={isToday}
						isSelected={isSelected}
						hasEvent={hasEvent}
						getEventColors={getEventColors}
					/>
				</div>
				<div
					className="w-full my-4 py-3 bg-blue-500 text-white text-lg flex items-center justify-center rounded-xl shadow-md hover:bg-blue-600 transition cursor-pointer"
					onClick={() => setShowModal(true)}
				>
					<FontAwesomeIcon icon={faPlus} />
				</div>
				<EventsList
					selectedDate={selectedDate}
					tags={tags}
					setIsEditing={setIsEditing}
					setEventToEdit={setEventToEdit}
					setNewTitle={setNewTitle}
					setNewDesc={setNewDesc}
					setNewStartTime={setNewStartTime}
					setNewEndTime={setNewEndTime}
					setSelectedTags={setSelectedTags}
					setShowModal={setShowModal}
				/>
			</div>
			{showModal && (
				<div
					id="event-modal"
					tabIndex={-1}
					className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
					inert={!showModal} // Use inert instead of aria-hidden
					onClick={(e) => handleModalClose(e, setShowModal, setIsEditing, setEventToEdit, setNewTitle, setNewDesc, setNewStartTime, setNewEndTime, setSelectedTags)}
				>
					<div className="relative p-4 mx-4 w-full max-w-md max-h-full bg-white rounded-lg shadow-lg">
						<div className="relative">
							<div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
								<h3 className="text-xl font-semibold text-gray-900">
									{isEditing ? 'Edit Event' : 'Add New Event'}
								</h3>
								<button
									type="button"
									className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
									onClick={() => {
										setShowModal(false);
										setIsEditing(false);
										setEventToEdit(null);
										setNewTitle('');
										setNewDesc('');
										setNewStartTime('');
										setNewEndTime('');
										setSelectedTags([]);
									}}
								>
									<svg
										className="w-3 h-3"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 14"
									>
										<path
											stroke="currentColor"
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
										/>
									</svg>
									<span className="sr-only">Close modal</span>
								</button>
							</div>
							<div className="p-4 md:p-5">
								<form
									className="space-y-4"
									onSubmit={(e) => {
										e.preventDefault();
										if (isEditing && eventToEdit) {
											const updatedEvent: Event = {
												...eventToEdit,
												title: newTitle.trim(),
												description: newDesc.trim(),
												// Update to use start and end times
												startTime: new Date(
													selectedDate.setHours(
														parseInt(newStartTime.split(':')[0]),
														parseInt(newStartTime.split(':')[1])
													)
												),
												endTime: new Date(
													selectedDate.setHours(
														parseInt(newEndTime.split(':')[0]),
														parseInt(newEndTime.split(':')[1])
													)
												),
												tagColor: selectedTags
													.map((tag) => tag.color)
													.join(','),
												tagName: selectedTags
													.map((tag) => tag.name)
													.join(','),
											};
											editEvent(updatedEvent);
										} else {
											addEvent(
												selectedDate,
												newTitle.trim() || 'Untitled Event',
												newDesc.trim() || 'No description provided',
												// Update to use start time
												newStartTime
													? new Date(
														selectedDate.setHours(
															parseInt(newStartTime.split(':')[0]),
															parseInt(newStartTime.split(':')[1])
														)
													)
													: new Date(
														selectedDate.getFullYear(),
														selectedDate.getMonth(),
														selectedDate.getDate(),
														0,
														0
													),
												// Add end time
												newEndTime
													? new Date(
														selectedDate.setHours(
															parseInt(newEndTime.split(':')[0]),
															parseInt(newEndTime.split(':')[1])
														)
													)
													: new Date(
														selectedDate.getFullYear(),
														selectedDate.getMonth(),
														selectedDate.getDate(),
														1,
														0
													),
												selectedTags
													.map((tag) => tag.color)
													.join(','),
												selectedTags
													.map((tag) => tag.name)
													.join(',')
											);
										}
										setShowModal(false);
										setIsEditing(false);
										setEventToEdit(null);
										setNewTitle('');
										setNewDesc('');
										setNewStartTime('');
										setNewEndTime('');
										setSelectedTags([]);
									}}
								>
									<div>
										<label
											htmlFor="title"
											className="block mb-2 text-sm font-medium text-gray-900"
										>
											Title
										</label>
										<input
											type="text"
											id="title"
											placeholder="Title"
											value={newTitle}
											onChange={(e) => setNewTitle(e.target.value)}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
											required
										/>
									</div>
									<div>
										<label
											htmlFor="description"
											className="block mb-2 text-sm font-medium text-gray-900"
										>
											Description
										</label>
										<textarea
											id="description"
											placeholder="Description"
											value={newDesc}
											onChange={(e) => setNewDesc(e.target.value)}
											className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
										/>
									</div>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<label
												htmlFor="startTime"
												className="block mb-2 text-sm font-medium text-gray-900"
											>
												Start Time
											</label>
											<input
												type="time"
												id="startTime"
												placeholder="Start time"
												value={newStartTime}
												onChange={(e) => setNewStartTime(e.target.value)}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
												required
											/>
										</div>
										<div>
											<label
												htmlFor="endTime"
												className="block mb-2 text-sm font-medium text-gray-900"
											>
												End Time
											</label>
											<input
												type="time"
												id="endTime"
												placeholder="End time"
												value={newEndTime}
												onChange={(e) => setNewEndTime(e.target.value)}
												className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
												required
											/>
										</div>
									</div>
									<div>
										<label
											htmlFor="existingTags"
											className="block mb-2 text-sm font-medium text-gray-900"
										>
											Categories
										</label>
										<div className="flex flex-wrap gap-2">
											{tags.map((tag) => (
												<div
													key={tag.name}
													className={`px-3 py-1 text-sm rounded-full cursor-pointer ${selectedTags.some(
														(t) => t.name === tag.name
													)
														? 'text-white'
														: 'bg-gray-200 text-gray-700'
														}`}
													style={{
														backgroundColor: selectedTags.some(
															(t) => t.name === tag.name
														)
															? tag.color
															: '',
													}}
													onClick={() => handleTagClick(tag, selectedTags, setSelectedTags)}
												>
													{tag.name}
												</div>
											))}
											{/* EDIT TAGS BTN */}
											<button
												type="button"
												className="px-3 py-1 text-sm rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
												onClick={() => {
													setShowTagModal(true);
													setNewTagName('');
													setSelectedTagColors([]);
												}}
											>
												<span className="">Edit</span>
												<FontAwesomeIcon icon={faPlus} className="ml-1" />
											</button>


										</div>
									</div>

									{/* Modal for adding new tags */}
									{showTagModal && (
										<div
											className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
											inert={!showTagModal} // Use inert instead of aria-hidden
											onClick={(e) => {
												if ((e.target as HTMLElement).classList.contains('fixed')) {
													handleTagModalClose(setShowTagModal, setNewTagName, setSelectedTagColors);
												}
											}}
										>
											<div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl transform transition-all duration-300 ease-in-out">
												<h3 className="text-lg font-medium text-gray-900 mb-2">
													Add New Tag
												</h3>
												<p className="text-gray-500 mb-4">
													Select a color and name for the new tag.
												</p>
												<div className="mb-4">
													<label
														htmlFor="tagName"
														className="block mb-2 text-sm font-medium text-gray-900"
													>
														Tag Name
													</label>
													<input
														type="text"
														id="tagName"
														value={newTagName}
														onChange={(e) => setNewTagName(e.target.value)}
														className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
													/>
												</div>
												<div className="mb-4">
													<label
														htmlFor="tagColor"
														className="block mb-2 text-sm font-medium text-gray-900"
													>
														Tag Color
													</label>
													<div className="flex space-x-2 mt-2">
														{[
															'red',
															'orange',
															'yellow',
															'green',
															'blue',
															'indigo',
															'violet',
															'pink',
															'teal',
															'gray',
														].map((color) => (
															<div
																key={color}
																className={`w-7 h-7 rounded-sm cursor-pointer border-2 ${selectedTagColors.includes(color)
																	? 'border-black'
																	: 'border-transparent'
																	}`}
																style={{ backgroundColor: color }}
																onClick={() => handleColorClick(color, setSelectedTagColors)}
															/>
														))}
													</div>
												</div>

												<div className="flex flex-wrap gap-2 mb-4">

													{/* Add functionality to delete tags */}
													{tags.map((tag) => (
														<div
															key={tag.name}
															className="flex items-center px-3 py-1 text-sm rounded-full bg-red-500 text-white cursor-pointer hover:bg-red-600 transition-colors"
															onClick={() => {
																setTagToDelete(tag);
																setShowDeleteTagModal(true);
															}}
														>
															<span className="mr-2">{tag.name}</span>
															<FontAwesomeIcon icon={faClose} className="text-xs" />
														</div>
													))}
												</div>

												<div className="flex justify-end space-x-3">
													<button
														className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
														onClick={() => handleTagModalClose(setShowTagModal, setNewTagName, setSelectedTagColors)}
													>
														Close
													</button>
													<div
														className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
														onClick={() => handleAddTag(newTagName, selectedTagColors, tags, setTags, setNewTagName, setSelectedTagColors, setShowTagModal)}
													>
														Add Tag
													</div>
												</div>
											</div>
										</div>
									)}

									{/* Modal for confirming tag deletion */}
									{showDeleteTagModal && tagToDelete && (
										<div
											className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
											onClick={(e) => {
												if ((e.target as HTMLElement).classList.contains('fixed')) {
													setShowDeleteTagModal(false);
													setTagToDelete(null);
												}
											}}
										>
											<div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl transform transition-all duration-300 ease-in-out">
												<h3 className="text-lg font-medium text-gray-900 mb-2">
													Confirm Delete
												</h3>
												<p className="text-gray-500 mb-4">
													Are you sure you want to delete the tag &quot;{tagToDelete.name}&quot;?
												</p>
												<div className="flex justify-end space-x-3">
													<button
														className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
														onClick={() => {
															setShowDeleteTagModal(false);
															setTagToDelete(null);
														}}
													>
														Cancel
													</button>
													<button
														className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
														onClick={() => {
															if (tagToDelete) {
																deleteTag(tagToDelete, tags, setTags);
																setShowDeleteTagModal(false);
																setTagToDelete(null);
															}
														}}
													>
														Delete
													</button>
												</div>
											</div>
										</div>
									)}

									<div className="flex justify-between mt-4">
										{isEditing && (
											<button
												type="button"
												className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
												onClick={() => {
													if (eventToEdit) {
														// Delete the event
														const events = getEvents(selectedDate).filter(
															(e: Event) => e !== eventToEdit
														);
														localStorage.setItem(
															'events',
															JSON.stringify(events)
														);
														setShowModal(false);
														setIsEditing(false);
														setEventToEdit(null);
													}
												}}
											>
												Delete
											</button>
										)}
										<button
											type="submit"
											className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
										>
											Save
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
