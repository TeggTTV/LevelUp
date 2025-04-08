import React from 'react';

interface DaysGridProps {
	days: (Date | null)[];
	selectedDate: Date;
	setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
	isToday: (date: Date) => boolean;
	isSelected: (date: Date, selectedDate: Date) => boolean;
	hasEvent: (date: Date) => boolean;
	getEventColors: (date: Date) => string[];
}

export default function DaysGrid({
	days,
	selectedDate,
	setSelectedDate,
	isToday,
	isSelected,
	hasEvent,
	getEventColors,
}: DaysGridProps) {
	return (
		<>
			<div className="grid grid-cols-7 mt-2 text-lg">
				{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
					<div
						key={d}
						className="justify-self-center w-8 h-8 flex items-center justify-center opacity-50 rounded-full"
					>
						{d}
					</div>
				))}
			</div>
			<div className="grid grid-cols-7 gap-1 mt-1">
				{days.map((day, index) => (
					<div
						key={index}
						className={`relative w-8 h-8 flex items-center justify-center cursor-pointer justify-self-center self-center
							${day
								? isToday(day)
									? 'border-b-2 border-blue-500 bg-blue-500/30 rounded-md'
									: isSelected(day, selectedDate)
									? 'bg-blue-500/30 rounded-sm'
									: ''
								: ''
							}`}
						onClick={() => {
							if (day) {
								if (isSelected(day, selectedDate)) {
									setSelectedDate(new Date());
								} else {
									setSelectedDate(day);
								}
							}
						}}
					>
						{day ? day.getDate() : ''}
						{day && hasEvent(day) && (
							<div className="absolute bottom-0 flex space-x-1">
								{getEventColors(day)
									.slice(0, 3)
									.map((color, idx) => (
										<span
											key={idx}
											className="w-1.5 h-1.5 rounded-full"
											style={{ backgroundColor: color }}
										/>
									))}
							</div>
						)}
					</div>
				))}
			</div>
		</>
	);
}
