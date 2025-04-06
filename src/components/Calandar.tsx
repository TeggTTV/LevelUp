import { useEffect, useState } from "react";

interface CalandarProps {
	changeDay: (event: MouseEvent) => void;
}

export default function Calandar({ changeDay }: CalandarProps) {
	const [display, setDisplay] = useState('');
	const [days, setDays] = useState<HTMLDivElement[]>([]);

	useEffect(() => {
		const formattedDate = new Date().toLocaleString('en-US', {
			month: 'long',
			year: 'numeric',
		});
		// display.innerHTML = `${formattedDate}`;
		setDisplay(formattedDate);

		const year = new Date().getFullYear();
		const month = new Date().getMonth();

		const firstDay = new Date(year, month, 1);
		const firstDayIndex = firstDay.getDay();
		const lastDay = new Date(year, month + 1, 0);
		const numberOfDays = lastDay.getDate();

		const days = [];
		for (let x = 1; x <= firstDayIndex; x++) {
			const div = document.createElement('div');
			div.innerHTML += '';
			days.push(div);
		}

		for (let i = 1; i <= numberOfDays; i++) {
			const div = document.createElement('div');
			const currentDate = new Date(year, month, i);
			div.dataset.date = currentDate.toDateString();
			div.innerHTML += i;
			div.classList.add('text-center');
			div.classList.add('rounded-full');
			div.classList.add('w-8');
			div.classList.add('h-8');
			div.classList.add('justify-self-center');
			div.classList.add('self-center');
			div.classList.add('flex');
			div.classList.add('justify-center');
			div.classList.add('items-center');
			if (
				currentDate.getFullYear() === new Date().getFullYear() &&
				currentDate.getMonth() === new Date().getMonth() &&
				currentDate.getDate() === new Date().getDate()
			) {
				div.classList.add('bg-blue-500');
				div.classList.add('text-white');
			}
            div.addEventListener('click', changeDay);

			days.push(div);

		}

		setDays(days);
	}, []);

	return (
		<div className="left-0 right-0 mx-auto w-screen max-w-sm h-screen p-4">
			<div className="calendar">
				<header className="flex justify-between items-center">
					<pre className="cursor-pointer text-md text-blue-500">
						◀
					</pre>
					<div className="flex items-center">
						<p className="text-blue-500 m-2 tet-md">{display}</p>
					</div>
					<pre className="cursor-pointer text-md text-blue-500">
						▶
					</pre>
				</header>
				<div className="grid grid-cols-7 m-auto justify-between">
					<div className="justify-self-center flex justify-center items-center w-8 h-8 rounded-full opacity-[.5]">
						Sun
					</div>
					<div className="justify-self-center flex justify-center items-center w-8 h-8 rounded-full opacity-[.5]">
						Mon
					</div>
					<div className="justify-self-center flex justify-center items-center w-8 h-8 rounded-full opacity-[.5]">
						Tue
					</div>
					<div className="justify-self-center flex justify-center items-center w-8 h-8 rounded-full opacity-[.5]">
						Wed
					</div>
					<div className="justify-self-center flex justify-center items-center w-8 h-8 rounded-full opacity-[.5]">
						Thu
					</div>
					<div className="justify-self-center flex justify-center items-center w-8 h-8 rounded-full opacity-[.5]">
						Fri
					</div>
					<div className="justify-self-center flex justify-center items-center w-8 h-8 rounded-full opacity-[.5]">
						Sat
					</div>
				</div>
				<div className="grid grid-cols-7 m-auto">
					{days.map((d, index) => {
						return (
							<div key={index} className={d.classList.toString()}>
								{d.innerHTML}
							</div>
						);
					})}
				</div>
			</div>
			<div className="mb-2.5 pt-5 pr-5 text-center">
				<p className="selected"></p>
			</div>
		</div>
	);
}
