import PropTypes from "prop-types";
import { useState } from "react";
import Button from "../Button";

function InputField(props) {
	const [previewUrl, setPreviewUrl] = useState(null);
	const isRequired = props.isRequired || false;

	const handleBlur = (e) => {
		if (props.validateOnBlur && typeof props.validate === "function") {
			props.validate(e.target.value);
		}
	};

	const handleChange = (e) => {
		if (props.onChange) {
			props.onChange(e);
		}

		if (props.validateOnChange && typeof props.validate === "function") {
			props.validate(e.target.value);
		}
	};

	const handleFileChange = (e) => {
		if (props.onFileChange) {
			props.onFileChange(e);
		}

		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]; // Get the selected file
			const reader = new FileReader();

			reader.onload = (event) => {
				setPreviewUrl(event.target.result);
			};

			reader.readAsDataURL(file);
		}
	};

	return (
		<div>
			{props.inputFieldLabelName && (
				<label
					htmlFor={props.inputFieldHtmlFor}
					className="mb-4 px-1 font-medium font-poppins text-middieBlue text-sm text-start"
				>
					{props.inputFieldLabelName}
					{isRequired && <span className="px-1 text-red-500">*</span>}
				</label>
			)}
			{props.fieldType === "file" ? (
				<div
					className={`mb-4 mr-2 mt-2 flex flex-col items-center rounded-lg border-2 ${
						props.inputFieldError ? "border-red-500" : "border-indigo-600"
					} px-3 py-2 font-muktaVaani text-sm text-middieBlue focus:outline-none h-full w-full`}
				>
					{!previewUrl ? (
						<div className="flex flex-col justify-center space-y-4 py-4">
							<Button
								onClick={() =>
									document.getElementById(props.inputFieldId).click()
								}
								buttonName="Choose File"
							/>
							<p className="text-gray-400">{props.inputFieldPlaceholder}</p>
						</div>
					) : (
						<div className="flex justify-between items-center space-x-12 py-[2px]">
							<img src={previewUrl} alt="File preview" className="h-24" />
							<svg
								onClick={() => {
									setPreviewUrl(null);
								}}
								className="w-6 h-6 cursor-pointer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
									height="1.2rem"
									fill="#636FAF"
								>
									<path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
								</svg>
							</svg>
						</div>
					)}
					<input
						id={props.inputFieldId}
						type="file"
						accept={props.acceptedFileTypes}
						onChange={handleFileChange}
						className="hidden"
						{...(isRequired ? { required: true } : {})}
					/>
				</div>
			) : props.fieldType === "textarea" ? (
				<textarea
					id={props.inputFieldId}
					placeholder={props.inputFieldPlaceholder}
					{...(isRequired ? { required: true } : {})}
					cols={props.cols}
					rows={props.rows}
					maxLength={props.maxLength}
					className={`outline-none placeholder:text-gray-400 placeholder:text-sm placeholder:font-muktaVaani placeholder:font-light mb-4 mr-2 mt-2 flex w-full items-center rounded-lg border-2 ${
						props.inputFieldError ? "border-red-500" : "border-indigo-500"
					} px-3 py-2 font-muktaVaani text-sm text-middieBlue focus:border-indigo-600`}
					{...(isRequired ? { required: true } : {})}
					onBlur={handleBlur}
					onChange={handleChange}
				/>
			) : (
				<input
					id={props.inputFieldId}
					type={props.inputFieldType}
					placeholder={props.inputFieldPlaceholder}
					pattern={props.inputFieldPattern}
					{...(isRequired ? { required: true } : {})}
					className={`outline-none placeholder:text-gray-400 placeholder:text-sm placeholder:font-muktaVaani placeholder:font-light mb-4 mr-2 mt-2 flex w-full items-center rounded-lg border-2 ${
						props.inputFieldError ? "border-red-500" : "border-indigo-500"
					} px-3 py-2 font-muktaVaani text-sm text-middieBlue focus:border-indigo-600`}
					{...(isRequired ? { required: true } : {})}
					onBlur={handleBlur}
					onChange={handleChange}
					name={props.inputFieldName} // Add this line
					{...(props.inputFieldAutoComplete ? { autocomplete: "off" } : {})}
				/>
			)}
			{props.inputFieldError && (
				<p className="mt-1 font-poppins text-red-500 text-xs">
					{props.inputFieldError}
				</p>
			)}
		</div>
	);
}

InputField.propTypes = {
	inputFieldHtmlFor: PropTypes.string.isRequired,
	inputFieldLabelName: PropTypes.string.isRequired,
	inputFieldId: PropTypes.string.isRequired,
	inputFieldType: PropTypes.string.isRequired,
	inputFieldPlaceholder: PropTypes.string.isRequired,
	inputFieldPattern: PropTypes.string,
	isRequired: PropTypes.bool, // New prop for specifying if the input is required
	fieldType: PropTypes.oneOf(["input", "textarea", "file"]), // Include "file" as an option
	cols: PropTypes.number, // New prop for textarea columns
	rows: PropTypes.number, // New prop for textarea rows
	maxLength: PropTypes.number, // New prop for textarea maxLength
	// inputFieldValue: PropTypes.string, // New prop for textarea value
	inputFieldError: PropTypes.string, // New prop for textarea error message
	validateOnBlur: PropTypes.bool, // New prop for enabling validation on blur
	validate: PropTypes.func, // New prop for the validation function
	onChange: PropTypes.func, // New prop for the onChange function
	inputFieldName: PropTypes.string, // New prop for the name of the input
	inputFieldAutoComplete: PropTypes.bool, // New prop for disabling autocomplete
	acceptedFileTypes: PropTypes.string, // New prop for specifying accepted file types for file input
	onFileChange: PropTypes.func, // New prop for the onFileChange function
	validateOnChange: PropTypes.bool, // New prop for enabling validation on change
};

export default InputField;
