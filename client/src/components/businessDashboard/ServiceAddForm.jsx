/* eslint-disable no-mixed-spaces-and-tabs */
import InputField from "../form/InputField";
import Button from "../Button";
import CheckboxList from "../form/CheckboxList";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Dropdown from "../form/Dropdown";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function ServiceAddForm({ service, onAdd, isModalOpen, setIsModalOpen }) {
	const [serviceTitle, setServiceTitle] = useState("");
	const [serviceDuration, setServiceDuration] = useState(["", 0]);
	const [servicePrice, setServicePrice] = useState("");
	const [serviceStartTime, setServiceStartTime] = useState("");
	const [serviceEndTime, setServiceEndTime] = useState("");
	const [serviceDescription, setServiceDescription] = useState("");
	const [selectedDays, setSelectedDays] = useState("");
	const [breakStartTime, setBreakStartTime] = useState("");
	const [breakEndTime, setBreakEndTime] = useState("");
	const [serviceType, setServiceType] = useState("");

	useEffect(() => {
		if (service) {
			setServiceTitle(service.title);
			setServiceDuration(service.duration);
			setServicePrice(service.price);
			setServiceStartTime(service.startTime);
			setServiceEndTime(service.endTime);
			setServiceDescription(service.description);
			setSelectedDays(service.days);
			setBreakStartTime(service.breakStartTime);
			setBreakEndTime(service.breakEndTime);
			setServiceType(service.type);
		} else {
			setServiceTitle("");
			setServiceDuration(["", 0]);
			setServicePrice("");
			setServiceStartTime("");
			setServiceEndTime("");
			setServiceDescription("");
			setSelectedDays("");
			setBreakStartTime("");
			setBreakEndTime("");
			setServiceType("");
		}
	}, [service]);

	const selectedBusiness = useSelector((state) => state.business.businessData);
	const businessEmail = selectedBusiness?.workEmail;
	const businessId = selectedBusiness?._id;
	const businessCategory = selectedBusiness?.category;
	const [serverError, setApiError] = useState("");

	function convertTo12Hour(time) {
		const [hour, minute] = time.split(":");
		return (hour % 12 || 12) + ":" + minute + " " + (hour >= 12 ? "PM" : "AM");
	}

	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [typedCharacters, setTypedCharacters] = useState(0);
	const typedCharactersElementRef = useRef(null);

	const handleDurationSelect = (value) => {
		let durationValue;
		switch (value) {
			case "15 mins":
				durationValue = 0.25;
				break;
			case "30 mins":
				durationValue = 0.5;
				break;
			case "45 mins":
				durationValue = 0.75;
				break;
			case "1 hour":
				durationValue = 1;
				break;
			case "2 hours":
				durationValue = 2;
				break;
			case "4 hours":
				durationValue = 4;
				break;
			default:
				durationValue = 0;
		}
		setServiceDuration([value, durationValue]);
	};

	const handleServiceTypeSelect = (value) => {
		setServiceType(value);
	};

	const durationsList = [
		"15 mins",
		"30 mins",
		"45 mins",
		"1 hour",
		"2 hours",
		"4 hours",
	];

	const serviceTypes = ["physical", "online"];

	const isServiceDescription = (value) => /^.{100,}$/.test(value);
	const [counterColor, setCounterColor] = useState("text-indigo-500");

	useEffect(() => {
		setCounterColor(
			serviceDescription.length < 100 ? "text-red-500" : "text-indigo-500"
		);
	}, [serviceDescription]);

	const isAlphabetic = (value) => /^[A-Za-z\s&]+$/.test(value);
	// const isNumeric = (value) => /^\d{1,2}$/.test(value);
	const isPrice = (value) => /^[0-9]{1,5}(\.[0-9]{1,2})?$/.test(value);
	const isNotEmpty = (value) => value.trim() !== "";

	const validateField = (
		value,
		validateFunc,
		errorMessage,
		fieldName,
		labelName
	) => {
		if (!value.trim()) {
			setError((prevErrors) => ({
				...prevErrors,
				[fieldName]: `${labelName} cannot be empty. Please fill this out.`,
			}));
		} else if (!validateFunc(value)) {
			setError((prevErrors) => ({
				...prevErrors,
				[fieldName]: errorMessage,
			}));
		} else {
			setError((prevErrors) => {
				//eslint-disable-next-line no-unused-vars
				const { [fieldName]: _, ...rest } = prevErrors;
				return rest;
			});
		}
	};

	useEffect(() => {
		const textAreaElement = document.querySelector("#serviceDescription");
		typedCharactersElementRef.current =
			document.querySelector("#typed-characters");

		const updateCharacterCount = () => {
			setTypedCharacters(textAreaElement.value.length);
		};

		textAreaElement.addEventListener("input", updateCharacterCount);

		return () => {
			textAreaElement.removeEventListener("input", updateCharacterCount);
		};
	}, []);

	useEffect(() => {
		if (typedCharactersElementRef.current) {
			typedCharactersElementRef.current.textContent = typedCharacters;
		}
	}, [typedCharacters]);

	const handleDaysSelect = (selectedDays) => {
		const daysOfWeek = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
		const sortedDays = selectedDays.sort(
			(a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b)
		);
		let formattedDays = "";
		for (let i = 0; i < sortedDays.length; i++) {
			if (
				i === 0 ||
				daysOfWeek.indexOf(sortedDays[i]) -
					daysOfWeek.indexOf(sortedDays[i - 1]) >
					1
			) {
				// Start of a new range
				formattedDays += (formattedDays ? ", " : "") + sortedDays[i];
			} else if (
				i === sortedDays.length - 1 ||
				daysOfWeek.indexOf(sortedDays[i]) -
					daysOfWeek.indexOf(sortedDays[i + 1]) <
					-1
			) {
				// End of a range
				formattedDays += "-" + sortedDays[i];
			}
		}
		setSelectedDays(formattedDays);
	};

	const handleAdd = async (event) => {
		setIsLoading(true);
		event.preventDefault();

		const serviceData = {
			businessId,
			serviceTitle,
			serviceDuration,
			servicePrice,
			serviceStartTime,
			serviceEndTime,
			breakStartTime,
			breakEndTime,
			selectedDays,
			serviceDescription,
			businessEmail,
			serviceType,
			businessCategory,
		};

		console.log("serviceData", serviceData);

		if (selectedDays.length === 0) {
			setError((prevErrors) => ({
				...prevErrors,
				selectedDays: "At least one day must be selected",
			}));
			setIsLoading(false);
			return;
		}

		try {
			const response = await axios.post("/services/add", serviceData);

			if (response.data.success) {
				setIsLoading(false);
				onAdd(); // Call the onAdd prop
			} else {
				setIsLoading(false);
			}
		} catch (error) {
			setIsLoading(false);
			setError(error.response.data.error);
			setApiError(error.response?.data || "An error occurred");
			console.error("Fetch error: ", error);
		}
	};

	return (
		<div className="flex flex-col justify-center items-center">
			<div className="md:w-full lg:w-[600px] xl:w-[800px]">
				<form onSubmit={handleAdd}>
					<div className="space-y-4 mt-12">
						<div className="justify-center space-x-4 grid grid-cols-5 w-full">
							<div className="col-span-4">
								<InputField
									inputFieldId="serviceTitle"
									inputFieldType="text"
									inputFieldPlaceholder={
										service && service.title ? service.title : "service title"
									}
									inputFieldHtmlFor="serviceTitle"
									inputFieldLabelName="Title"
									isRequired={true}
									fieldType="input"
									value={
										service && service.title ? service.title : serviceTitle
									}
									onChange={(e) => setServiceTitle(e.target.value)}
									validateOnBlur={true}
									validate={(value) =>
										service
											? null
											: validateField(
													value,
													isAlphabetic,
													"Business name should only contain alphabets",
													"serviceTitle",
													"Service Title" // pass the label name here
											  )
									}
									inputFieldError={error.serviceTitle}
								/>
							</div>

							<div className="col-span-1">
								<Dropdown
									dropdownbuttonname={
										service && service.type ? service.type : "select type"
									}
									dropdownlabelname="Type"
									dropdownlabelhtmlfor="serviceType"
									onOptionSelect={handleServiceTypeSelect}
									dropdownError={error.serviceType}
									value={serviceType}
									onChange={(e) => setServiceType(e.target.value)}
									dropdownOptions={serviceTypes}
								/>
							</div>
						</div>

						<div className="gap-4 grid grid-flow-col w-full">
							<div className="">
								<Dropdown
									dropdownbuttonname={
										service && service.duration[0]
											? service.duration[0]
											: "select duration"
									}
									dropdownlabelname="Duration"
									dropdownlabelhtmlfor="serviceDuration"
									onOptionSelect={handleDurationSelect}
									dropdownError={error.serviceDuration}
									value={serviceDuration}
									onChange={(e) => setServiceDuration(e.target.value)}
									dropdownOptions={durationsList}
								/>
							</div>

							<div className="">
								<InputField
									inputFieldId="servicePrice"
									inputFieldType="text"
									inputFieldPlaceholder={
										service && service.price ? service.price : "service price"
									}
									inputFieldHtmlFor="servicePrice"
									inputFieldLabelName="Price"
									isRequired={true}
									fieldType="input"
									value={servicePrice}
									onChange={(e) => {
										const value = parseFloat(e.target.value);
										if (!isNaN(value) && value >= 0) {
											setServicePrice(e.target.value);
										}
									}}
									validateOnBlur={true}
									validate={(value) =>
										validateField(
											value,
											isPrice,
											"Service price must be a non-negative integer of no more than 5 digits",
											"servicePrice",
											"Service Price"
										)
									}
									inputFieldError={error.servicePrice}
								/>
							</div>

							<div className="">
								<InputField
									inputFieldId="serviceStartTime"
									inputFieldType="time"
									inputFieldPlaceholder={
										service && service.startTime
											? service.startTime
											: "xx am/pm"
									}
									inputFieldHtmlFor="serviceStartTime"
									inputFieldLabelName="Start Time"
									isRequired={true}
									fieldType="input"
									value={serviceStartTime}
									onChange={(e) =>
										setServiceStartTime(convertTo12Hour(e.target.value))
									}
									validateOnBlur={true}
									validate={(value) =>
										validateField(
											value,
											isNotEmpty,
											"Service start time is required",
											"serviceStartTime",
											"Service Start Time"
										)
									}
									inputFieldError={error.serviceStartTime}
								/>
							</div>

							<div className="">
								<InputField
									inputFieldId="serviceEndTime"
									inputFieldType="time"
									inputFieldPlaceholder="xx am/pm"
									inputFieldHtmlFor="serviceEndTime"
									inputFieldLabelName="End Time"
									isRequired={true}
									fieldType="input"
									value={convertTo12Hour(serviceEndTime)}
									onChange={(e) =>
										setServiceEndTime(convertTo12Hour(e.target.value))
									}
									validateOnBlur={true}
									validate={(value) =>
										validateField(
											value,
											isNotEmpty,
											"Service end time is required",
											"serviceEndTime",
											"Service End Time"
										)
									}
									inputFieldError={error.serviceEndTime}
								/>
							</div>

							<div className="">
								<InputField
									inputFieldId="breakStartTime"
									inputFieldType="time"
									inputFieldPlaceholder="xx am/pm"
									inputFieldHtmlFor="breakStartTime"
									inputFieldLabelName="Break Start Time"
									isRequired={false}
									fieldType="input"
									value={convertTo12Hour(breakStartTime)}
									onChange={(e) =>
										setBreakStartTime(convertTo12Hour(e.target.value))
									}
									validateOnBlur={true}
									inputFieldError={error.breakStartTime}
								/>
							</div>

							<div className="">
								<InputField
									inputFieldId="breakEndTime"
									inputFieldType="time"
									inputFieldPlaceholder="xx am/pm"
									inputFieldHtmlFor="breakEndTime"
									inputFieldLabelName="Break End Time"
									isRequired={false}
									fieldType="input"
									value={convertTo12Hour(breakEndTime)}
									onChange={(e) =>
										setBreakEndTime(convertTo12Hour(e.target.value))
									}
									validateOnBlur={true}
									inputFieldError={error.breakEndTime}
								/>
							</div>
						</div>

						<div>
							<CheckboxList
								onItemsChange={handleDaysSelect}
								label="Select Days"
								items={["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]}
								checkboxFor="serviceDays"
							/>
							{error.selectedDays && (
								<p className="mt-1 font-poppins text-red-500 text-xs">
									{error.selectedDays}
								</p>
							)}
						</div>

						<div>
							<InputField
								inputFieldId="serviceDescription"
								inputFieldType="text"
								inputFieldPlaceholder={
									service && service.description
										? service.description
										: "enter service description"
								}
								inputFieldHtmlFor="serviceDescription"
								inputFieldLabelName="Description"
								isRequired={true}
								fieldType="textarea"
								cols={10}
								rows={5}
								maxLength={500}
								value={serviceDescription}
								onChange={(e) => setServiceDescription(e.target.value)}
								validateOnBlur={true}
								validate={(value) =>
									validateField(
										value,
										isServiceDescription,
										"Service description should be atleast 100 characters.",
										"serviceDescription",
										"Service Description"
									)
								}
								inputFieldError={error.serviceDescription}
							/>
							<div
								id="character-counter"
								className={`text-right opacity-80 text-indigo-500 text-sm ${counterColor}`}
							>
								<span id="typed-characters">{serviceDescription.length}</span>
								<span>/</span>
								<span id="maximum-characters">500</span>
							</div>
						</div>
					</div>
					{serverError && (
						<p className="mt-1 font-poppins text-red-500 text-xs">
							{serverError}
						</p>
					)}

					<div className="flex justify-center space-x-12 py-8">
						{isModalOpen && service && (
							<Button
								buttonName="CLOSE MODAL AND SKIP"
								buttonStyle="secondary"
								onClick={() => setIsModalOpen(false)}
							/>
						)}
						<Button
							buttonName={isModalOpen ? "UPDATE SERVICE" : "ADD SERVICE"}
							buttonType="submit"
							disabled={isLoading}
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

ServiceAddForm.propTypes = {
	onAdd: PropTypes.func.isRequired,
	isModalOpen: PropTypes.bool,
	service: PropTypes.object,
	setIsModalOpen: PropTypes.func,
};

export default ServiceAddForm;
