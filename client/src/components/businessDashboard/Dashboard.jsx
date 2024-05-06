import { useSelector } from "react-redux";
import Layout from "../Layout";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppointmentCard from "./AppointmentCard";
import Button from "../Button";
import BarChart from "../DataVisualization/BarChart";
import PieDoughnutChart from "../DataVisualization/PieDoughnutChart";
import DotsChart from "../DataVisualization/DotsChart";
// import { Tilt } from "react-tilt";
import VanillaTilt from "../VanillaTilt";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ContentLoader from "react-content-loader";

function Dashboard() {
	const { auth, user, business, service } = useSelector((state) => ({
		auth: state.auth,
		user: state.user,
		business: state.business,
		service: state.service,
	}));
	console.log(auth, user, business, service);

	const selectedBusiness = business.businessData;
	const imagePath = selectedBusiness?.profilePicture
		? selectedBusiness?.profilePicture.replace("public/", "/backend/public/")
		: "";
	const businessName = selectedBusiness?.name;

	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!selectedBusiness && !auth.isAuthenticated) {
			setIsModalOpen(true);
			setTimeout(() => {
				navigate("/schedulizer/signin");
			}, 4000); // 4000 milliseconds = 4 seconds
		}
	}, [selectedBusiness, navigate, auth.isAuthenticated]);

	const closeModalAndNavigate = () => {
		setIsModalOpen(false);
	};

	const [appointments, setAppointments] = useState([]);

	const fetchAppointments = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await axios.get("/appointments/all");
			const allAppointments = response.data.data;

			// Fetch the service for each appointment
			const appointmentsWithService = await Promise.all(
				allAppointments.map(async (appointment) => {
					// Extract the serviceId from the array
					const serviceId = appointment.serviceId[0];
					const serviceResponse = await axios.get(`/services/${serviceId}`);
					console.log(serviceResponse.data); // Add this line
					return { ...appointment, service: serviceResponse.data.data };
				})
			);

			setAppointments(appointmentsWithService);
		} catch (error) {
			console.error("Fetch error: ", error);
		}
		setIsLoading(false);
	}, []);

	useEffect(() => {
		fetchAppointments(); // Fetch the services when the component mounts
	}, [fetchAppointments]);

	if (isLoading) {
		return (
			<Layout>
				<div className="pt-32 pb-6">
					<h1 className="flex justify-center font-bebas font-semibold text-8xl text-indigo-500 tracking-wide">
						BUSINESS DASHBOARD.
					</h1>
				</div>

				<div className="flex justify-center items-center space-x-32 py-6">
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

					<div className="flex flex-col justify-center space-y-4">
						<div className="flex justify-center space-x-6">
							<div className="flex flex-col justify-center space-y-2">
								<VanillaTilt options={{ max: 3, scale: 1.01 }}>
									<BarChart
										width={300}
										height={200}
										events={true}
										bgColour="#6875F5"
										pathsColour="#FAF8ED"
									/>
								</VanillaTilt>

								<p className="font-medium font-poppins text-center text-sm">
									Another SatiGraphsfaction
								</p>
							</div>

							<div className="flex flex-col justify-center space-y-2">
								<VanillaTilt options={{ max: 3, scale: 1.01 }}>
									<PieDoughnutChart
										width={300}
										height={200}
										events={true}
										bgColour="#6875F5"
										pathsColour="#FAF8ED"
										satisfactionPercentage={70}
									/>
								</VanillaTilt>

								<p className="font-medium font-poppins text-center text-sm">
									Customer Satisfaction
								</p>
							</div>
						</div>

						<div className="flex flex-col justify-center space-y-2">
							<VanillaTilt options={{ max: 3, scale: 1.01 }}>
								<DotsChart
									width={620}
									height={150}
									bgColour="#6875F5"
									pathsColour="#FAF8ED"
								/>
							</VanillaTilt>

							<p className="font-medium font-poppins text-center text-sm">
								Customer Growth
							</p>
						</div>
					</div>
				</div>

				<div className="flex flex-col space-y-12 py-16">
					<h1 className="flex justify-center font-bebas font-semibold text-6xl text-indigo-500 tracking-wide">
						UPCOMING APPOINTMENTS.
					</h1>

					<div className="flex justify-center">
						<Button
							buttonName="VIEW ALL"
							buttonLink="/schedulizer/businessDashboard/${businessName}/appointments"
						/>
					</div>

					<div className="flex border-indigo-500 border-x-2 mx-12 py-1 pl-6 overflow-x-auto">
						<div className="flex flex-nowrap space-x-6">
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
					</div>
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="pt-32 pb-6">
				<h1 className="flex justify-center font-bebas font-semibold text-8xl text-indigo-500 tracking-wide">
					BUSINESS DASHBOARD.
				</h1>
			</div>

			<div className="flex justify-center items-center space-x-32 py-6">
				<VanillaTilt
					options={{
						max: 3,
						scale: 1.01,
						perspective: 500,
						speed: 800,
						transformStyle: "preserve-3d",
					}}
				>
					<div
						className="flex flex-col justify-center items-center space-y-6 border-2 border-indigo-500 hover:border-indigo-600 bg-[#FAF8ED] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-8 rounded-2xl break-words cursor-default group"
						style={{
							transformStyle: "preserve-3d",
							transform: "perspective(1000px)",
						}}
					>
						<div className="flex flex-col justify-center items-center space-y-4">
							<img
								className="border-2 border-black rounded-full w-20 h-20"
								src={imagePath}
								alt="Profile"
								style={{ transform: "translateZ(50px)" }}
							/>
							<div className="flex flex-col justify-center items-center">
								<div className="font-poppins font-semibold text-black text-lg">
									{selectedBusiness?.name}
								</div>

								<div className="flex justify-between space-x-6">
									<div className="font-muktaVaani text-black text-xs">
										{selectedBusiness?.category}
									</div>
									<div className="font-muktaVaani text-black text-xs">
										{selectedBusiness?.city}
									</div>
									<div className="font-muktaVaani text-black text-xs">
										Rating: 4.5 / 5
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-center items-center w-96 font-muktaVaani font-normal text-black text-center text-sm">
							{selectedBusiness?.bio}
						</div>
					</div>
				</VanillaTilt>

				<div className="flex flex-col justify-center space-y-4">
					<div className="flex justify-center space-x-6">
						<div className="flex flex-col justify-center space-y-2">
							<VanillaTilt options={{ max: 3, scale: 1.01 }}>
								<BarChart
									width={300}
									height={200}
									events={true}
									bgColour="#6875F5"
									pathsColour="#FAF8ED"
								/>
							</VanillaTilt>

							<p className="font-medium font-poppins text-center text-sm">
								Another SatiGraphsfaction
							</p>
						</div>

						<div className="flex flex-col justify-center space-y-2">
							<VanillaTilt options={{ max: 3, scale: 1.01 }}>
								<PieDoughnutChart
									width={300}
									height={200}
									events={true}
									bgColour="#6875F5"
									pathsColour="#FAF8ED"
									satisfactionPercentage={70}
								/>
							</VanillaTilt>

							<p className="font-medium font-poppins text-center text-sm">
								Customer Satisfaction
							</p>
						</div>
					</div>

					<div className="flex flex-col justify-center space-y-2">
						<VanillaTilt options={{ max: 3, scale: 1.01 }}>
							<DotsChart
								width={620}
								height={150}
								bgColour="#6875F5"
								pathsColour="#FAF8ED"
							/>
						</VanillaTilt>

						<p className="font-medium font-poppins text-center text-sm">
							Customer Growth
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col space-y-12 py-16">
				<h1 className="flex justify-center font-bebas font-semibold text-6xl text-indigo-500 tracking-wide">
					UPCOMING APPOINTMENTS.
				</h1>

				<div className="flex justify-center">
					<Button
						buttonName="VIEW ALL"
						buttonLink={`/schedulizer/businessDashboard/${businessName}/appointments`}
					/>
				</div>

				<div className="flex border-indigo-500 border-x-2 mx-12 py-1 pl-6 overflow-x-auto">
					<div className="flex flex-nowrap space-x-6">
						{appointments.map((appointment) => (
							<div key={appointment._id} className="flex-shrink-0">
								<AppointmentCard
									appointment={appointment}
									businessName={appointment.businessName}
									serviceName={appointment.service.title}
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="pattern-topography-[#FAF8ED]/40 pattern-topography-scale-[0.5] z-10 fixed inset-0 items-center bg-indigo-600 overflow-y-auto"
					onClose={closeModalAndNavigate}
				>
					<div className="w-full min-h-screen text-center">
						<Dialog.Overlay className="fixed" />
						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>
						<Dialog.Description
							as="div"
							className="inline-block bg-[#FAF8ED] my-8 p-12 rounded-2xl text-center transform transition-all overflow-hidden align-middle"
						>
							<Dialog.Title
								as="h1"
								className="mb-4 font-bebas font-semibold text-5xl text-indigo-500 leading-2"
							>
								DASHBOARD ACCESS DENIED.
							</Dialog.Title>
							<div className="mt-2">
								<p className="font-poppins text-black text-sm">
									You&rsquo;re not signed in as a business owner. <br /> Please
									sign in as a business owner to access the dashboard.
								</p>
							</div>
						</Dialog.Description>
					</div>
				</Dialog>
			</Transition>
		</Layout>
	);
}

export default Dashboard;
