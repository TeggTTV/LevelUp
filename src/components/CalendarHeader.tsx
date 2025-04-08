import React from 'react';

interface CalendarHeaderProps {
	display: string;
	month: number;
	setMonth: React.Dispatch<React.SetStateAction<number>>;
	setYear: React.Dispatch<React.SetStateAction<number>>;
}

export default function CalendarHeader({
	display,
	month,
	setMonth,
	setYear,
}: CalendarHeaderProps) {
	return (
		<header className="flex justify-between items-center">
			<pre
				className="cursor-pointer text-2xl text-blue-500"
				onClick={() => {
					if (month === 0) {
						setMonth(11);
						setYear((prev) => prev - 1);
					} else {
						setMonth((prev) => prev - 1);
					}
				}}
			>
				◀
			</pre>
			<p className="text-blue-500 m-2 text-lg">{display}</p>
			<pre
				className="cursor-pointer text-2xl text-blue-500"
				onClick={() => {
					if (month === 11) {
						setMonth(0);
						setYear((prev) => prev + 1);
					} else {
						setMonth((prev) => prev + 1);
					}
				}}
			>
				▶
			</pre>
		</header>
	);
}
