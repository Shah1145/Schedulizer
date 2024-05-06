import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Button(props) {
	const navigate = useNavigate();
	const buttonType = props.buttonType || "button";

	const buttonClass =
		props.buttonStyle === "secondary"
			? "border border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-600 hover:text-[#FAF8ED]"
			: "bg-indigo-500 text-[#FAF8ED] hover:bg-indigo-600";

	const handleClick = async () => {
		if (props.onClick) {
			try {
				await props.onClick();
				if (props.buttonLink) {
					navigate(props.buttonLink);
				}
			} catch (error) {
				console.error(error); // Log the error to the console
			}
		} else if (props.buttonLink) {
			navigate(props.buttonLink);
		}
	};

	return (
		<div className="flex justify-center text-center">
			<button
				type={buttonType}
				disabled={props.disabled}
				className={`flex w-full items-center justify-center rounded-md px-6 font-ptSansCaption text-xs transition-colors text-[#FAF8ED] duration-300 ease-in-out xs:py-2 sm:py-2 md:px-4 ${buttonClass} ${
					props.disabled ? "opacity-50 cursor-not-allowed" : ""
				}`}
				onClick={handleClick}
			>
				{typeof props.buttonName === "string"
					? props.buttonName.toUpperCase()
					: props.buttonName}{" "}
			</button>
		</div>
	);
}

Button.propTypes = {
	buttonName: PropTypes.string.isRequired,
	buttonLink: PropTypes.string,
	buttonType: PropTypes.oneOf(["button", "submit", "reset"]),
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	buttonStyle: PropTypes.oneOf(["primary", "secondary"]),
};

export default Button;
