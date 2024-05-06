import Layout from "./Layout";
import InputField from "./form/InputField";
import { useEffect, useRef, useState } from "react";
import TimeSlotSelectorButton from "./Form/TimeSlotSelectorButton";
import Button from "./Button";
import moment from "moment";
import axios from "axios";
import TransitionModal from "./TransitionModal";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import VanillaTilt from "./VanillaTilt";
import DateSelector from "./Form/DateSelector";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ContentLoader from "react-content-loader";

function AppointmentForm() {
	const { auth, user } = useSelector((state) => ({
		auth: state.auth,
		user: state.user,
	}));
	const [service, setService] = useState();
	const [business, setBusiness] = useState();

	const userId = user?.id;

	const location = useLocation();
	const { serviceId, businessId } = location.state; // Access data from state

	const isUserSignedIn = useSelector((state) => state.user.isUserSignedIn);
	const navigate = useNavigate();

	const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
	const [isSubmissionSuccessModalOpen, setIsSubmissionSuccessModalOpen] =
		useState(false);

	const [typedCharacters, setTypedCharacters] = useState(0);
	const typedCharactersElementRef = useRef(null);
	const textAreaElementRef = useRef(null);
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [nameForAppointment, setNameForAppointment] = useState("");
	const [appointmentDate, setAppointmentDate] = useState(null);
	const [appointmentMessage, setAppointmentMessage] = useState("");
	const [appointmentTime, setAppointmentTime] = useState("");

	useEffect(() => {
		if (!isUserSignedIn && !auth.isAutheenticated) {
			setIsWarningModalOpen(true);
			setTimeout(() => {
				navigate("/schedulizer/signin");
			}, 4000); // 4000 milliseconds = 4 seconds
		}
	}, [isUserSignedIn, navigate, auth.isAutheenticated]);

	const closeModalAndNavigate = () => {
		setIsWarningModalOpen(false);
	};

	const calculateSlots = (service) => {
		setIsLoading(true);
		const start = moment(service?.startTime, "h:mm A");
		const end = moment(service?.endTime, "h:mm A");
		const breakStart = moment(service?.breakStartTime, "h:mm A");
		const breakEnd = moment(service?.breakEndTime, "h:mm A");

		let slots = [];
		let current = start;

		while (current < end) {
			if (!(current >= breakStart && current < breakEnd)) {
				let slotEnd = moment(current).add(service?.duration[1], "hours");
				slots.push(
					current.format("h:mm A") + " to " + slotEnd.format("h:mm A")
				);
			}
			current.add(service?.duration[1], "hours");
		}
		setIsLoading(false);
		return slots;
	};

	useEffect(() => {
		setIsLoading(true);
		const fetchService = async () => {
			try {
				const response = await axios.get(`/services/${serviceId}`);
				setService(response.data.data);
				console.log("service data:", response.data.data);
			} catch (error) {
				console.error("Fetch error oioiservice: ", error);
			}
		};

		fetchService();
		const fetchBusiness = async () => {
			try {
				const response = await axios.get(`/businesses/${businessId}`);
				setBusiness(response.data);
				console.log("business data:", response.data);
			} catch (error) {
				console.error("Fetch error: ", error);
			}
		};

		fetchBusiness();
		setIsLoading(false);
	}, [serviceId, businessId]);

	useEffect(() => {
		typedCharactersElementRef.current =
			document.querySelector("#typed-characters");

		const updateCharacterCount = () => {
			if (textAreaElementRef.current) {
				setTypedCharacters(textAreaElementRef.current.value.length);
			}
		};

		if (textAreaElementRef.current) {
			textAreaElementRef.current.addEventListener(
				"input",
				updateCharacterCount
			);
		}

		return () => {
			if (textAreaElementRef.current) {
				textAreaElementRef.current.removeEventListener(
					"input",
					updateCharacterCount
				);
			}
		};
	}, []);

	useEffect(() => {
		if (typedCharactersElementRef.current) {
			typedCharactersElementRef.current.textContent = typedCharacters;
		}
	}, [typedCharacters]);

	const isAlphabetic = (value) => /^[A-Za-z\s&]+$/.test(value);
	const isAppointmentMessage = (value) => /^.{100,}$/.test(value);

	const validateField = (
		value,
		validateFunc,
		errorMessage,
		labelName,
		isRequired
	) => {
		if (isRequired && !value.trim()) {
			setError((prevErrors) => ({
				...prevErrors,
				[labelName]: `${labelName} cannot be empty. Please fill this out.`,
			}));
		} else if (value.trim() && !validateFunc(value)) {
			setError((prevErrors) => ({
				...prevErrors,
				[labelName]: errorMessage,
			}));
		} else {
			setError((prevErrors) => {
				//eslint-disable-next-line no-unused-vars
				const { [labelName]: _, ...rest } = prevErrors;
				return rest;
			});
		}
	};

	const handleButtonClick = (id, slot) => {
		setAppointmentTime(slot);
	};

	// console.log("appointmentTime", appointmentTime);

	const handleSubmit = async (event) => {
		setIsLoading(true);
		event.preventDefault();

		const appointmentData = {
			nameForAppointment,
			appointmentDate,
			appointmentMessage,
			appointmentTime,
			serviceId,
			userId,
		};

		try {
			const response = await axios.post(
				"/appointments/create",
				appointmentData
			);
			console.log(response.data);

			// Check if the form submission was successful
			if (response.data.success) {
				setIsLoading(false);
				setIsSubmissionSuccessModalOpen(true);
				// Delay navigation by 4 seconds
				setTimeout(() => {
					navigate("/schedulizer/services");
				}, 4000);
			} else {
				setIsLoading(false);
			}
		} catch (error) {
			console.log("error data", error.response?.data);
			console.log("Form data", appointmentData);
			setIsLoading(false);
		}
	};

	const timing = `${service?.startTime} to ${service?.endTime}`;

	const [allSlots, setAllSlots] = useState([]);
	const [disabledSlots, setDisabledSlots] = useState([]);

	// Fetch all slots when the component mounts
	useEffect(() => {
		if (service) {
			const slots = calculateSlots(service);
			setAllSlots(slots);
		}
	}, [service]);

	// Calculate disabled slots whenever selectedDate changes
	useEffect(() => {
		setIsLoading(true);
		console.log("appointmentDate", appointmentDate);

		const fetchAppointments = async () => {
			if (!appointmentDate) return;

			try {
				const response = await axios.get("/appointments/all");
				let appointments = response.data.data;

				// Filter appointments based on the selected date
				appointments = appointments.filter((appointment) => {
					const appointmentDateObj = new Date(appointment.date);
					const selectedDateObj = new Date(
						appointmentDate.split(":")[1].trim()
					);
					return (
						appointmentDateObj.toDateString() === selectedDateObj.toDateString()
					);
				});

				const disabled = appointments.map((appointment) =>
					allSlots.includes(appointment.time) ? appointment.time : null
				);

				setDisabledSlots(disabled.filter(Boolean)); // filter out undefined values
			} catch (error) {
				console.error("Fetch error: ", error);
			}
		};

		fetchAppointments();
		setIsLoading(false);
	}, [appointmentDate, allSlots]);

	console.log("error", error);

	if (isLoading) {
		return (
			<Layout>
				<div className="pt-32 pb-6">
					<h1 className="flex justify-center font-bebas font-semibold text-8xl text-indigo-500 tracking-wide">
						BOOK YOUR APPOINTMENT.
					</h1>
				</div>

				<div className="flex justify-center items-center space-x-6 pt-12">
					<Skeleton
						height={80}
						width={300}
						baseColor="#667eea" // Indigo-500
						highlightColor="#7f9cf5" // A lighter shade of Indigo for the animation highlight
						duration={2} // Speed of the animation
						enableAnimation
					>
						<ContentLoader
							width={400}
							height={150}
							viewBox="0 0 400 150"
							backgroundColor="#FAF8ED"
							foregroundColor="#4C51BF"
						>
							{/* Left part of the card */}
							<rect x="10" y="10" rx="5" ry="5" width="180" height="130" />

							{/* Right part of the card */}
							<rect x="210" y="10" rx="5" ry="5" width="180" height="130" />

							{/* Text lines in the left part of the card */}
							<rect x="20" y="20" rx="5" ry="5" width="160" height="10" />
							<rect x="20" y="40" rx="5" ry="5" width="160" height="10" />
							<rect x="20" y="60" rx="5" ry="5" width="160" height="10" />

							{/* Text lines in the right part of the card */}
							<rect x="220" y="20" rx="5" ry="5" width="160" height="10" />
							<rect x="220" y="40" rx="5" ry="5" width="160" height="10" />
						</ContentLoader>
					</Skeleton>
				</div>

				<div className="flex justify-center items-center py-6">
					<form className="flex justify-center items-center space-x-32 px-24">
						<div className="flex flex-wrap justify-center gap-4 w-3/5">
							{[...Array(5)].map((_, i) => (
								<div key={i} className="appointment-card-skeleton">
									<Skeleton
										height={80}
										width={300}
										baseColor="#667eea" // Indigo-500
										highlightColor="#7f9cf5" // A lighter shade of Indigo for the animation highlight
										duration={2} // Speed of the animation
										enableAnimation
									>
										<ContentLoader
											width={400}
											height={150}
											viewBox="0 0 400 150"
											backgroundColor="#FAF8ED"
											foregroundColor="#4C51BF"
										>
											{/* Left part of the card */}
											<rect
												x="10"
												y="10"
												rx="5"
												ry="5"
												width="180"
												height="130"
											/>

											{/* Right part of the card */}
											<rect
												x="210"
												y="10"
												rx="5"
												ry="5"
												width="180"
												height="130"
											/>

											{/* Text lines in the left part of the card */}
											<rect
												x="20"
												y="20"
												rx="5"
												ry="5"
												width="160"
												height="10"
											/>
											<rect
												x="20"
												y="40"
												rx="5"
												ry="5"
												width="160"
												height="10"
											/>
											<rect
												x="20"
												y="60"
												rx="5"
												ry="5"
												width="160"
												height="10"
											/>

											{/* Text lines in the right part of the card */}
											<rect
												x="220"
												y="20"
												rx="5"
												ry="5"
												width="160"
												height="10"
											/>
											<rect
												x="220"
												y="40"
												rx="5"
												ry="5"
												width="160"
												height="10"
											/>
										</ContentLoader>
									</Skeleton>
								</div>
							))}
						</div>

						<div className="flex flex-col justify-center">
							<Skeleton
								height={80}
								width={300}
								baseColor="#667eea" // Indigo-500
								highlightColor="#7f9cf5" // A lighter shade of Indigo for the animation highlight
								duration={2} // Speed of the animation
								enableAnimation
							>
								<ContentLoader
									width={400}
									height={150}
									viewBox="0 0 400 150"
									backgroundColor="#FAF8ED"
									foregroundColor="#4C51BF"
								>
									{/* Left part of the card */}
									<rect x="10" y="10" rx="5" ry="5" width="180" height="130" />

									{/* Right part of the card */}
									<rect x="210" y="10" rx="5" ry="5" width="180" height="130" />

									{/* Text lines in the left part of the card */}
									<rect x="20" y="20" rx="5" ry="5" width="160" height="10" />
									<rect x="20" y="40" rx="5" ry="5" width="160" height="10" />
									<rect x="20" y="60" rx="5" ry="5" width="160" height="10" />

									{/* Text lines in the right part of the card */}
									<rect x="220" y="20" rx="5" ry="5" width="160" height="10" />
									<rect x="220" y="40" rx="5" ry="5" width="160" height="10" />
								</ContentLoader>
							</Skeleton>
						</div>
					</form>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="pt-32 pb-6">
				<h1 className="flex justify-center font-bebas font-semibold text-8xl text-indigo-500 tracking-wide">
					BOOK YOUR APPOINTMENT.
				</h1>
			</div>

			<div className="flex justify-center items-center space-x-6 pt-12">
				<VanillaTilt
					options={{
						max: 2,
						scale: 1.01,
						perspective: 500,
						speed: 800,
						transformStyle: "preserve-3d",
					}}
				>
					<div className="inline-flex flex-col justify-center items-center gap-5 border-2 border-indigo-500 hover:border-indigo-600 bg-[#FAF8ED] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-6 rounded-2xl md:max-w-sm break-words cursor-default group">
						<div className="flex flex-col justify-center items-center gap-7">
							<div className="flex flex-col space-y-4">
								<div className="flex flex-col justify-center text-center">
									<div className="font-poppins font-semibold text-base text-black">
										{service?.title}
									</div>
									<div className="font-extralight font-muktaVaani text-black text-sm">
										by <span className="font-light">{business?.name}</span>
									</div>
								</div>

								<div className="flex flex-col justify-center items-center space-x-4 font-muktaVaani text-black text-xs serviceDetails">
									<div className="flex justify-start space-x-6">
										<div>
											Duration:
											<span className="font-semibold">
												{service?.duration[0]}
											</span>
										</div>
										<div>
											Price:{" "}
											<span className="font-semibold">Rs.{service?.price}</span>
										</div>
									</div>
									<div className="flex justify-start space-x-6">
										<div>
											Timings: <span className="font-semibold">{timing}</span>
										</div>
										<div>
											Days:{" "}
											<span className="font-semibold">{service?.days}</span>
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-wrap py-2 font-muktaVaani font-normal text-black text-center text-sm break-words description">
								{service?.description}
							</div>
						</div>
					</div>
				</VanillaTilt>
			</div>

			<div className="flex justify-center py-6">
				<form
					onSubmit={handleSubmit}
					className="flex justify-center items-center space-x-20 px-24 pt-6"
				>
					<div className="flex flex-wrap justify-center gap-4 w-full">
						{allSlots.map((slot, slotIndex) => (
							<div key={slotIndex} className="relative">
								<TimeSlotSelectorButton
									isSelected={appointmentTime === slot}
									onClick={() =>
										handleButtonClick(`selection${slotIndex}`, slot)
									}
									clearSelection={() => handleButtonClick(null)}
									buttonName={slot}
									disabled={disabledSlots.includes(slot)}
								/>
							</div>
						))}
					</div>

					<div className="flex flex-col justify-center">
						<div className="gap-x-8 gap-y-4 grid grid-cols-1 md:grid-cols-2 md:w-full lg:w-[600px] xl:w-[500px]">
							<div className="">
								<InputField
									inputFieldId="nameForAppointment"
									inputFieldType="text"
									inputFieldPlaceholder="enter you name e.g. John"
									inputFieldHtmlFor="nameForAppointment"
									inputFieldLabelName="Name"
									isRequired={true}
									fieldType="input"
									value={nameForAppointment}
									onChange={(e) => setNameForAppointment(e.target.value)}
									validateOnBlur={true}
									validate={(value) =>
										validateField(
											value,
											isAlphabetic,
											"Name should only contain alphabets",
											"Name",
											true
										)
									}
									inputFieldError={error.Name}
								/>
							</div>

							<div>
								<DateSelector
									dateSelectorHtmlFor="appointmentDate"
									dateSelectorLabelName="Appointment Date"
									enabledDays={service?.days}
									onDateSelect={(date) => {
										setAppointmentDate(date);
									}}
									value={appointmentDate}
								/>
							</div>

							<div className="md:col-span-2">
								<InputField
									inputFieldId="appointmentMessage"
									inputFieldType="text"
									inputFieldPlaceholder="enter a message for appointment"
									inputFieldHtmlFor="appointmentMessage"
									inputFieldLabelName="Message"
									isRequired={false}
									fieldType="textarea"
									cols={10}
									rows={5}
									maxLength={500}
									value={appointmentMessage}
									onChange={(e) => {
										setAppointmentMessage(e.target.value);
									}}
									validate={(value) =>
										validateField(
											value,
											isAppointmentMessage,
											"Appointment message should be at least 100 characters.",
											"Message",
											false
										)
									}
									validateOnBlur={true}
									inputFieldError={error.Message}
								/>

								<div
									id="character-counter"
									className={`text-right opacity-80 text-sm ${
										appointmentMessage.length < 100 &&
										appointmentMessage.length > 0
											? "text-red-500"
											: "text-indigo-500"
									}`}
								>
									<span id="typed-characters">{appointmentMessage.length}</span>
									<span>/</span>
									<span id="maximum-characters">500</span>
								</div>
							</div>
						</div>

						<div className="px-40 pt-4">
							<Button
								buttonName="BOOK NOW"
								disabled={isLoading || Object.keys(error).length > 0}
								buttonType="submit"
							/>
						</div>
					</div>
				</form>
			</div>

			<TransitionModal
				isOpen={isWarningModalOpen}
				onClose={closeModalAndNavigate}
				title="Access Denied. Sign In Required!"
				description="You&rsquo;re not signed in. Please sign in to book an appointment."
				className="pattern-topography-[#FAF8ED]/40 pattern-topography-scale-[0.5] z-10 fixed inset-0 bg-indigo-600 overflow-y-auto"
			/>

			<TransitionModal
				isOpen={isSubmissionSuccessModalOpen}
				onClose={closeModalAndNavigate}
				title="Appointment Booked Successfully!"
				description="Your appointment has been successfully booked. Redirecting you to the services page."
				className="pattern-topography-[#FAF8ED]/40 pattern-topography-scale-[0.5] z-10 fixed inset-0 bg-indigo-600 overflow-y-auto"
			/>
		</Layout>
	);
}

export default AppointmentForm;
