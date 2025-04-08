import React from 'react';
import { Event, Tag } from '@/utils/util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight';

interface EventsListProps {
	selectedDate: Date;
	tags: Tag[];
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	setEventToEdit: React.Dispatch<React.SetStateAction<Event | null>>;
	setNewTitle: React.Dispatch<React.SetStateAction<string>>;
	setNewDesc: React.Dispatch<React.SetStateAction<string>>;
	setNewStartTime: React.Dispatch<React.SetStateAction<string>>;
	setNewEndTime: React.Dispatch<React.SetStateAction<string>>;
	setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EventsList({
	selectedDate,
	tags,
	setIsEditing,
	setEventToEdit,
	setNewTitle,
	setNewDesc,
	setNewStartTime,
	setNewEndTime,
	setSelectedTags,
	setShowModal,
}: EventsListProps) {
	const events = JSON.parse(localStorage.getItem('events') || '[]') as Event[];

	return (
		<div className="w-full mt-4 max-h-[300px] overflow-y-auto space-y-2 pr-1">
			{events
				.filter((e) => new Date(e.startTime).toDateString() === selectedDate.toDateString())
				.map((e, idx) => (
					<div
						key={idx}
						className={`flex flex-col gap-2 p-6 bg-white rounded-lg shadow-md border-l-4`}
						style={{ borderColor: e.tagColor ? e.tagColor.split(',')[0] : 'gray' }}
					>
						<div className="text-lg font-semibold flex justify-between">
							<h2 className="w-full text-xl font-bold">{e.title}</h2>
						</div>
						<p className="text-sm text-gray-600">{e.description}</p>
						<div>
							{new Date(e.startTime).toLocaleTimeString([], {
								hour: '2-digit',
								minute: '2-digit',
							})}
							<FontAwesomeIcon icon={faCaretRight} className="mx-2" />
							{new Date(e.endTime).toLocaleTimeString([], {
								hour: '2-digit',
								minute: '2-digit',
							})}
						</div>
						{e.tagName && (

							<div className="flex flex-wrap gap-2 mt-2">
								{e.tagName.split(',').map((tagName, index) => (
									<span
										key={index}
										className="px-3 py-1 text-sm rounded-full text-white"
										style={{
											backgroundColor: e.tagColor.split(',')[index] || 'gray',
										}}
									>
										{tagName}
									</span>
								))}
							</div>
						)}
						<button
							className="mt-2 py-2 px-4 rounded-md text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
							onClick={() => {
								setIsEditing(true);
								setEventToEdit(e);
								setNewTitle(e.title);
								setNewDesc(e.description);
								setNewStartTime(new Date(e.startTime).toTimeString().slice(0, 5));
								setNewEndTime(new Date(e.endTime).toTimeString().slice(0, 5));
								setSelectedTags(
									tags.filter((tag) => e.tagName.split(',').includes(tag.name))
								);
								setShowModal(true);
							}}
						>
							Edit Event
						</button>
					</div>
				))}
		</div>
	);
}
