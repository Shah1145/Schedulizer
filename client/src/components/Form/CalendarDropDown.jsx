import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";

function CalendarDropdown({
	dropdowListOpen,
	handleOptionSelect,
	toggleDropdown,
	enabledDays,
}) {
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const [date, setDate] = useState(new Date());
	const [view, setView] = useState("days"); // 'days', 'months', 'years'

	const yearRange = [date.getFullYear() - 5, date.getFullYear() + 5];

	const changeView = (newView) => {
		setView(newView);
	};

	const selectMonth = (monthIndex) => {
		const currentYear = new Date().getFullYear();
		const currentMonth = new Date().getMonth();

		if (date.getFullYear() === currentYear && monthIndex < currentMonth) {
			// Don't allow to select months that have passed in the current year
			return;
		}

		setDate(new Date(date.getFullYear(), monthIndex, 1));
		setView("days");
	};

	const selectYear = (year) => {
		const currentYear = new Date().getFullYear();
		const currentMonth = new Date().getMonth();

		if (year < currentYear) {
			// Don't allow to select previous years
			return;
		}

		let month = date.getMonth();
		if (year === currentYear && month < currentMonth) {
			// If the selected year is the current year and the selected month has already passed,
			// set the month to the current month
			month = currentMonth;
		}

		setDate(new Date(year, month, 1));
		setView("days");
	};

	const previousMonth = () => {
		let newMonth = date.getMonth() - 1;
		let newYear = date.getFullYear();

		if (newMonth < 0) {
			newMonth = 11; // December
			newYear -= 1; // Previous year
		}

		setDate(new Date(newYear, newMonth, 1));
	};

	const nextMonth = () => {
		let newMonth = date.getMonth() + 1;
		let newYear = date.getFullYear();

		if (newMonth > 11) {
			newMonth = 0; // January
			newYear += 1; // Next year
		}

		setDate(new Date(newYear, newMonth, 1));
	};

	const daysInMonth = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).getDate();

	const firstDayOfMonth = new Date(
		date.getFullYear(),
		date.getMonth(),
		1
	).getDay();

	const calendarDays = [...Array(daysInMonth + firstDayOfMonth).keys()].map(
		(i) => (i >= firstDayOfMonth ? i - firstDayOfMonth + 1 : null)
	);

	const handleOutsideClick = (event) => {
		if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
			toggleDropdown();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	console.log("Enabled Days:", enabledDays);

	const parseEnabledDays = (enabledDays) => {
		const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
		const enabledDaysArray = enabledDays.split(",").map((s) => s.trim());
		let disabledDates = [];

		enabledDaysArray.forEach((day) => {
			if (day.includes("-")) {
				const [startDay, endDay] = day.split("-");
				let startIndex = daysOfWeek.indexOf(startDay);
				let endIndex = daysOfWeek.indexOf(endDay);

				if (startIndex <= endIndex) {
					for (let i = startIndex; i <= endIndex; i++) {
						disabledDates.push(i);
					}
				} else {
					for (let i = startIndex; i < 7; i++) {
						disabledDates.push(i);
					}
					for (let i = 0; i <= endIndex; i++) {
						disabledDates.push(i);
					}
				}
			} else {
				disabledDates.push(daysOfWeek.indexOf(day));
			}
		});

		return disabledDates;
	};

	const enabledDaysIndices = parseEnabledDays(enabledDays);

	const handleDateSelect = (selectedDate, event) => {
		if (enabledDaysIndices.includes(selectedDate.getDay())) {
			handleOptionSelect(selectedDate, event);
			toggleDropdown();
		}
	};

	const dropdownRef = useRef(null);

	const listClassNames = `absolute z-10 float-left m-0 ${
		dropdowListOpen ? "" : "hidden"
	}  overflow-y-auto min-w-max p-6 list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block`;

	const now = new Date();
	now.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000

	const displayedDate = new Date(date.getFullYear(), date.getMonth(), 1);

	const isFuture = displayedDate > now;

	return (
		<div
			ref={dropdownRef}
			className={listClassNames}
			aria-labelledby="calendarDropdownButton"
			data-te-dropdown-menu-ref
		>
			{view === "days" && (
				<div className="font-muktaVaani text-sm">
					<div
						className={`flex items-center mb-4 ${
							isFuture ? "justify-between" : "justify-evenly space-x-4"
						}`}
					>
						{isFuture && (
							<div className="flex justify-center items-center space-x-2">
								<button onClick={previousMonth}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
										height="1.2rem"
										className="fill-indigo-500 hover:fill-indigo-600 hover:scale-105"
									>
										<path d="M360 224L272 224v-56c0-9.531-5.656-18.16-14.38-22C248.9 142.2 238.7 143.9 231.7 150.4l-96 88.75C130.8 243.7 128 250.1 128 256.8c.3125 7.781 2.875 13.25 7.844 17.75l96 87.25c7.031 6.406 17.19 8.031 25.88 4.188s14.28-12.44 14.28-21.94l-.002-56L360 288C373.3 288 384 277.3 384 264v-16C384 234.8 373.3 224 360 224zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z" />
									</svg>
								</button>

								<p>Previous</p>
							</div>
						)}

						<div className="flex justify-center items-center">
							<button
								aria-label="Change view to months"
								onClick={() => changeView("months")}
								className="px-1 text-indigo-500 underline underline-offset-4 hover:underline-offset-2 transition-all duration-300 ease-in-out"
							>
								{months[date.getMonth()]}
							</button>

							<p>,</p>

							<button
								aria-label="Change view to years"
								onClick={() => changeView("years")}
								className="px-1 text-indigo-500 underline underline-offset-4 hover:underline-offset-2 transition-all duration-300 ease-in-out"
							>
								{date.getFullYear()}
							</button>
						</div>

						<div className="flex justify-center items-center space-x-2">
							<p>Next</p>

							<button onClick={nextMonth}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
									height="1.2rem"
									className="fill-indigo-500 hover:fill-indigo-600 hover:scale-105"
								>
									<path d="M280.2 150.2C273.1 143.8 262.1 142.2 254.3 146.1S239.1 158.5 239.1 167.1l.002 56L152 224C138.8 224 128 234.8 128 248v16C128 277.3 138.8 288 152 288L240 287.1v56c0 9.531 5.656 18.16 14.38 22c8.75 3.812 18.91 2.094 25.91-4.375l96-88.75C381.2 268.3 384 261.9 384 255.2c-.3125-7.781-2.875-13.25-7.844-17.75L280.2 150.2zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z" />
								</svg>
							</button>
						</div>
					</div>

					<div className="gap-2 grid grid-cols-7">
						{days.map((day, index) => (
							<div key={index} className="text-center">
								{day}
							</div>
						))}
						{calendarDays.map((day, index) => {
							const dayDate = new Date(
								date.getFullYear(),
								date.getMonth(),
								day
							);
							const isPast = dayDate < now;

							return (
								<div
									key={index}
									className="flex justify-center space-y-4 text-center text-xs"
								>
									{day && (
										<a
											href="#"
											className={`flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 dark:hover:bg-neutral-600 active:bg-indigo-700 dark:active:bg-neutral-500 disabled:bg-indigo-400 dark:disabled:bg-neutral-400 dark:bg-neutral-700 rounded-full w-8 h-8 text-white disabled:text-white dark:disabled:text-neutral-400 dark:text-neutral-200 disabled:cursor-not-allowed disabled:pointer-events-none ${
												!enabledDaysIndices.includes(dayDate.getDay()) || isPast
													? "opacity-50 cursor-not-allowed"
													: ""
											}`}
											onClick={(event) => {
												event.preventDefault();
												if (day && !isPast) {
													handleDateSelect(dayDate, event);
												}
											}}
										>
											{day}
										</a>
									)}
								</div>
							);
						})}
					</div>
				</div>
			)}
			{view === "months" && (
				<div className="gap-6 grid grid-cols-3">
					{months.map((month, index) => {
						const currentYear = new Date().getFullYear();
						const currentMonth = new Date().getMonth();

						return (
							<div key={index} className="flex text-center">
								<button
									onClick={() => selectMonth(index)}
									className={`text-indigo-500 underline underline-offset-4 hover:underline-offset-2 transition-all duration-300 ease-in-out ${
										date.getFullYear() === currentYear && index < currentMonth
											? "opacity-50 cursor-not-allowed"
											: ""
									}`}
									disabled={
										date.getFullYear() === currentYear && index < currentMonth
									}
								>
									{month}
								</button>
							</div>
						);
					})}
				</div>
			)}
			{view === "years" && (
				<div className="gap-6 grid grid-cols-3">
					{Array.from(
						{ length: yearRange[1] - yearRange[0] + 1 },
						(_, i) => yearRange[0] + i
					).map((year, index) => (
						<div key={index} className="text-center">
							<button
								onClick={() => selectYear(year)}
								className={`text-indigo-500 underline underline-offset-4 hover:underline-offset-2 transition-all duration-300 ease-in-out ${
									year < new Date().getFullYear()
										? "opacity-50 cursor-not-allowed"
										: ""
								}`}
								disabled={year < new Date().getFullYear()}
							>
								{year}
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
}

CalendarDropdown.propTypes = {
	handleOptionSelect: PropTypes.func.isRequired,
	dropdowListOpen: PropTypes.bool.isRequired,
	toggleDropdown: PropTypes.func.isRequired,
	enabledDays: PropTypes.string.isRequired,
};

export default CalendarDropdown;
