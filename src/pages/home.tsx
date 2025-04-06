import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import { getEvents } from '@/util';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
	const [display, setDisplay] = useState('');
	const [days, setDays] = useState<HTMLDivElement[]>([]);

	const [selectedDate, setSelectedDate] = useState(new Date());

	const usingDate = new Date();
	const [year, setYear] = useState<number>(usingDate.getFullYear());
	const [month, setMonth] = useState<number>(usingDate.getMonth());

	const firstDay = new Date(year, month, 1);
	const firstDayIndex = firstDay.getDay();
	const lastDay = new Date(year, month + 1, 0);
	const numberOfDays = lastDay.getDate();

	const updateDays = useCallback(() => {
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
			div.classList.add('z-100');

			if (
				currentDate.getFullYear() === new Date().getFullYear() &&
				currentDate.getMonth() === new Date().getMonth() &&
				currentDate.getDate() === new Date().getDate()
			) {
				div.classList.add('bg-blue-500');
				div.classList.add('text-white');
			}

			days.push(div);
		}
		setDays(days);

		days.forEach((day) => {
			if (
				new Date(day.dataset.date).toLocaleDateString() ===
				new Date(selectedDate).toLocaleDateString()
			) {
				setSelected(days, day);
				return;
			}
		});
	}, [selectedDate, firstDayIndex, numberOfDays, year, month, setDays]);

	const updateDisplay = useCallback(() => {
		const current = new Date(year, month, 1);
		const formattedDate = current.toLocaleString('en-US', {
			month: 'long',
			year: 'numeric',
		});
		setDisplay(formattedDate);
	}, [year, month, setDisplay]);
	useEffect(() => {
		updateDisplay();
		updateDays();
	}, [updateDays, updateDisplay]);

	function goBackMonth() {
		setDays([]);
		if (month === 0) {
			setMonth(11);
			setYear(year - 1);
			usingDate.setFullYear(year - 1);
			usingDate.setMonth(11);
		} else {
			setMonth(month - 1);
			usingDate.setMonth(month - 1);
		}
		updateDays();
		updateDisplay();
	}

	function goForwardMonth() {
		setDays([]);
		// setSelectedDate(new Date());
		if (month === 11) {
			setMonth(0);
			setYear(year + 1);
			usingDate.setFullYear(year + 1);
			usingDate.setMonth(0);
		} else {
			setMonth(month + 1);
			usingDate.setMonth(month + 1);
		}
		updateDays();
		updateDisplay();
	}

	function setSelected(arr, d) {
		if (
			new Date(d.dataset.date).toLocaleDateString() ===
			new Date().toLocaleDateString()
		) {
			arr.forEach((day) => {
				day.classList.remove('bg-white');
				day.classList.remove('border-2');
			});
			return;
		} else {
			arr.forEach((day) => {
				day.classList.remove('bg-white');
				day.classList.remove('border-2');
			});
			d.classList.add('bg-white');
			d.classList.add('border-2');
		}
	}

	return (
		<>
			<Navbar />
			<div className="left-0 right-0 mx-auto w-screen max-w-sm h-screen p-4">
				<div className="calendar">
					<header className="flex justify-between items-center">
						<pre
							className="cursor-pointer text-2xl text-blue-500"
							onClick={goBackMonth}
						>
							◀
						</pre>
						<div className="flex items-center">
							<p className="text-blue-500 m-2 text-lg">
								{display}
							</p>
						</div>
						<pre
							className="cursor-pointer text-2xl text-blue-500"
							onClick={goForwardMonth}
						>
							▶
						</pre>
					</header>
					<div className="grid grid-cols-7 m-auto justify-between text-lg">
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
					<div className="grid grid-cols-7 m-auto text-lg">
						{days.map((d, index) => {
							return (
								<div
									key={index}
									className={d.classList.toString()}
									onClick={() => {
										setSelected(days, d);
										if (
											new Date(
												d.dataset.date!
											).toLocaleDateString() ===
											new Date(
												selectedDate
											).toLocaleDateString()
										) {
											setSelectedDate(new Date());
										} else
											setSelectedDate(
												new Date(d.dataset.date!)
											);
									}}
								>
									{d.innerHTML}
								</div>
							);
						})}
					</div>
				</div>
				<div className="w-full mt-4">
                    <div className="w-full h-5 my-2 p-4 border-2 border-blue-500 text-blue-500 text-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
					{getEvents(selectedDate).map((e) => {
						return (
							<div className="w-full border p-4">
								<div className="text-lg flex justify-between">
									<div>{e.title}</div>
									<div>
                                        {e.deadline.toLocaleTimeString()}
									</div>
								</div>
								<div className="text-md">{e.description}</div>
							</div>
						);
					})}
				</div>
			</div>
			<Footer />
		</>
	);
}
