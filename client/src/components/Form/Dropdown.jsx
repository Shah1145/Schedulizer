import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DropdownList from "./DropdownList";

function Dropdown(props) {
	const [selectedOption, setSelectedOption] = useState(null);
	const [dropdowListOpen, setDropdowListOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState(null); // New state
	const dropdownRef = useRef(null);

	useEffect(() => {
		// console.log(
		// 	"Selected Value(" + props.dropdownlabelname + "):",
		// 	selectedValue
		// );
	}, [selectedValue, props.dropdownlabelname]);

	const handleOptionSelect = (optionId, event) => {
		event.preventDefault(); // Prevent the default behavior

		setSelectedOption(optionId);
		setDropdowListOpen(false);

		const selectedValue = props.dropdownOptions[optionId];
		setSelectedValue(selectedValue);

		if (props.onOptionSelect) {
			props.onOptionSelect(selectedValue);
		}
	};

	const dropdownliname = (index) => props.dropdownOptions[index];

	const buttonColorClass =
		selectedOption !== null ? "text-black" : "text-gray-400";
	const buttonBorderColorClass = dropdowListOpen
		? "focus:border-indigo-600"
		: "focus:border-indigo-500";

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setDropdowListOpen(false);
			}
		};

		// Add event listener when the dropdown is open
		if (dropdowListOpen) {
			document.addEventListener("click", handleClickOutside);
		}

		// Remove event listener when the component is unmounted
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [dropdowListOpen]);

	const handleButtonClick = () => {
		setDropdowListOpen((prevOpen) => !prevOpen);
	};

	return (
		<div className="relative" data-te-dropdown-ref ref={dropdownRef}>
			<label
				htmlFor={props.dropdownlabelhtmlfor}
				className="mb-4 px-1 font-medium font-poppins text-grey-900 text-sm text-start"
			>
				{props.dropdownlabelname}
			</label>
			<button
				className={`flex font-muktaVaani items-center bg-white justify-between text-end w-full px-3 py-2 mt-2 mb-4 text-sm border-2 border-indigo-500 rounded-lg ${buttonBorderColorClass} ${buttonColorClass}`}
				type="button"
				id="dropdownMenuButton1"
				data-te-dropdown-toggle-ref
				aria-expanded="false"
				data-te-ripple-init
				data-te-ripple-color="light"
				onClick={handleButtonClick}
			>
				{selectedOption !== null
					? dropdownliname(selectedOption)
					: props.dropdownbuttonname}
				<span className="mr-2 w-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="black"
						className="w-5 h-5"
					>
						<path
							fillRule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
							clipRule="evenodd"
						/>
					</svg>
				</span>
			</button>
			{props.dropdownError && (
				<p className="mt-1 font-poppins text-red-500 text-xs">
					{props.dropdownError}
				</p>
			)}
			{props.dropdownOptions && (
				<DropdownList
					dropdowListOpen={dropdowListOpen}
					listLength={props.dropdownOptions.length}
					handleOptionSelect={handleOptionSelect}
					dropdownliname={dropdownliname}
				/>
			)}
		</div>
	);
}

Dropdown.propTypes = {
	dropdownbuttonname: PropTypes.string.isRequired,
	dropdownlabelname: PropTypes.string.isRequired,
	dropdownlabelhtmlfor: PropTypes.string.isRequired,
	dropdownOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
	onOptionSelect: PropTypes.func, // New prop
	dropdownError: PropTypes.string,
};

export default Dropdown;
