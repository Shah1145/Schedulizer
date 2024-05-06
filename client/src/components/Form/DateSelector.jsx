import PropTypes from "prop-types";
import { useState } from "react";
import CalendarDropDown from "./CalendarDropDown";

function DateSelector(props) {
	const [date, setDate] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isTouched, setIsTouched] = useState(false);
	const [error, setError] = useState(null); // new state variable for the error message

	function formatDate(date) {
		const days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		const day = days[date.getDay()];
		const dd = String(date.getDate()).padStart(2, "0");
		const monthName = months[date.getMonth()];
		const yyyy = date.getFullYear();

		return `${day} : ${dd} ${monthName}, ${yyyy}`;
	}

	function handleOptionSelect(selectedDate) {
		setDate(selectedDate);
		setIsTouched(true); // set isTouched to true when a date is selected
		setError(null); // clear the error message when a date is selected
		const formattedDate = formatDate(selectedDate);
		console.log(formattedDate);
		toggleDropdown(); // Close the dropdown when a date is selected
		props.onDateSelect(formattedDate); // call the callback with the selected date
	}

	function toggleDropdown() {
		if (isOpen && !date) {
			setError("Please select a date"); // set the error message when no date is selected and the dropdown is about to close
		}
		setIsOpen(!isOpen);
	}

	// console.log("enabledDays:", props.enabledDays);

	return (
		<div>
			<div className="relative">
				<label
					htmlFor={props.dateSelectorHtmlFor}
					className="mb-4 px-1 font-medium font-poppins text-middieBlue text-sm text-start"
				>
					{props.dateSelectorLabelName}
					<span className="px-1 text-red-500">*</span>
				</label>

				<button
					className={`flex font-muktaVaani items-center bg-white justify-between text-end w-full px-3 py-2 mt-2 mb-4 group text-sm border-2 ${
						isTouched && !date && error
							? "border-red-500 hover:border-red-600"
							: "border-indigo-500"
					} rounded-lg ${
						isOpen ? "focus:border-indigo-600" : "focus:border-indigo-500"
					} ${date ? "text-black" : "text-gray-400"}`}
					type="button"
					id="calendarDropdownButton"
					aria-expanded="false"
					onClick={() => {
						setIsTouched(true); // set isTouched to true when the button is clicked
						toggleDropdown();
					}}
					data-te-dropdown-toggle-ref
					data-te-ripple-init
					data-te-ripple-color="light"
				>
					{date ? formatDate(date) : "Select appointment date"}
					<span className="mr-2 w-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 448 512"
							height="1.2rem"
							className={`group-hover:fill-indigo-600 group-hover:scale-105 ${
								isTouched && !date && error
									? "fill-red-500 group-hover:fill-red-600"
									: "fill-indigo-500"
							}`}
						>
							<path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z" />
						</svg>
					</span>
				</button>
			</div>
			{!date && isTouched && error && (
				<p className="mt-1 font-poppins text-red-500 text-xs">{error}</p>
			)}
			{isOpen && (
				<CalendarDropDown
					dropdowListOpen={isOpen}
					handleOptionSelect={handleOptionSelect}
					toggleDropdown={toggleDropdown}
					enabledDays={props.enabledDays} // Pass disabledDays as a prop to CalendarDropdown
				/>
			)}
		</div>
	);
}

DateSelector.propTypes = {
	dateSelectorHtmlFor: PropTypes.string.isRequired,
	dateSelectorLabelName: PropTypes.string.isRequired,
	enabledDays: PropTypes.string.isRequired,
	onDateSelect: PropTypes.func.isRequired, // new prop
};

export default DateSelector;
