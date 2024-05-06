import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import VanillaTilt from "../VanillaTilt";

function TimeSlotSelectorButton(props) {
	const navigate = useNavigate();
	const buttonType = props.buttonType || "button";

	const handleClick = (event) => {
		event.stopPropagation();

		if (props.onClick) {
			try {
				props.onClick();
			} catch (error) {
				console.error(error); // Log the error to the console
			}
		}
		if (props.buttonLink) {
			navigate(props.buttonLink);
		}
	};

	useEffect(() => {
		if (props.isSelected && props.disabled) {
			props.clearSelection();
		}
	}, [props.disabled, props]);

	const buttonClass = props.isSelected ? "bg-indigo-500 text-white" : "";

	return (
		<VanillaTilt
			options={{
				max: 5,
				scale: 1.01,
				perspective: 500,
				speed: 800,
				transformStyle: "preserve-3d",
				y: 0,
			}}
		>
			<div className="flex justify-center items-center gap-2 text-center">
				<button
					type={buttonType}
					disabled={props.disabled}
					className={`flex w-full items-center justify-center rounded-2xl bg-[#FAF8ED] px-6 py-2 font-ptSansCaption text-xs text-indigo-500 border-2 border-indigo-500 transition-colors duration-300 animate-ease-in-out hover:bg-indigo-500 hover:text-[#FAF8ED] ${buttonClass} ${
						props.disabled ? "opacity-50 cursor-not-allowed" : ""
					}`}
					style={{
						transform: props.isSelected ? "scale(1.05)" : "scale(1)",
					}} // Add this line
					onClick={handleClick}
				>
					{props.buttonName}
				</button>

				{props.isSelected && (
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						height="1.5rem"
						className="transition-transform duration-500 hover:cursor-pointer fill-indigo-500 hover:scale-110 ease-in-out"
						onClick={(e) => {
							e.stopPropagation();
							props.clearSelection(); // clear the selected category
						}}
					>
						<path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c9.4-9.4-9.4-24.6 0-33.9z" />
					</svg>
				)}
			</div>
		</VanillaTilt>
	);
}

TimeSlotSelectorButton.propTypes = {
	buttonName: PropTypes.string.isRequired,
	buttonLink: PropTypes.string,
	buttonType: PropTypes.oneOf(["button", "submit", "reset"]),
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	isSelected: PropTypes.bool,
	clearSelection: PropTypes.func,
};

export default TimeSlotSelectorButton;
