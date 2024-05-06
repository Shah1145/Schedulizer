import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Layout from "../Layout";
import AppointmentCard from "./AppointmentCard";
import Filters from "../Filters";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ContentLoader from "react-content-loader";

function BusinessAppointments() {
	const [appointments, setAppointments] = useState([]);
	const [selectedSort, setSelectedSort] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const sortAppointments = (appointments, sortOption) => {
		switch (sortOption) {
			case "NEWEST":
				return appointments.sort((a, b) => new Date(b.date) - new Date(a.date));
			case "OLDEST":
				return appointments.sort((a, b) => new Date(a.date) - new Date(b.date));
			case "MONTH":
				return appointments.sort(
					(a, b) => new Date(a.date).getMonth() - new Date(b.date).getMonth()
				);
			case "YEAR":
				return appointments.sort(
					(a, b) =>
						new Date(a.date).getFullYear() - new Date(b.date).getFullYear()
				);
			case "DURATION":
				return appointments.sort((a, b) => a.duration - b.duration);
			default:
				return appointments;
		}
	};

	const fetchAppointments = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await axios.get("/appointments/all");
			let allAppointments = response.data.data;

			// Fetch the service for each appointment
			const appointmentsWithService = await Promise.all(
				allAppointments.map(async (appointment) => {
					// Extract the serviceId from the array
					const serviceId = appointment.serviceId[0];
					const serviceResponse = await axios.get(`/services/${serviceId}`);
					return { ...appointment, service: serviceResponse.data.data };
				})
			);

			// Sort appointments
			if (selectedSort.length > 0) {
				allAppointments = sortAppointments(
					appointmentsWithService,
					selectedSort[0]
				);
			} else {
				allAppointments = appointmentsWithService;
			}

			setAppointments(allAppointments);
		} catch (error) {
			console.error("Fetch error: ", error);
		}
		setIsLoading(false);
	}, [selectedSort]);

	useEffect(() => {
		fetchAppointments(); // Fetch the services when the component mounts
	}, [fetchAppointments]);

	// console.log("Appointments: ", appointments);
	// console.log(
	// 	"Services: ",
	// 	appointments.map((a) => a.service)
	// );

	if (isLoading) {
		return (
			<Layout>
				<div className="pt-32 pb-6">
					<h1 className="flex justify-center font-bebas font-semibold text-8xl text-indigo-500 tracking-wide">
						ALL APPOINTMENTS.
					</h1>
				</div>

				<div className="flex flex-col py-6">
					<Filters
						selectedFilters={selectedSort}
						setSelectedFilters={setSelectedSort}
						filterType="sort"
					/>

					<div className="flex flex-wrap justify-center items-center gap-8 px-12 py-16">
						{[...Array(20)].map((_, i) => (
							<div key={i} className="flex space-x-2 appointment-card-skeleton">
								<Skeleton
									height={80}
									width={150}
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
										<rect x="20" y="20" rx="5" ry="5" width="160" height="10" />
										<rect x="20" y="40" rx="5" ry="5" width="160" height="10" />
										<rect x="20" y="60" rx="5" ry="5" width="160" height="10" />

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

								<Skeleton
									height={80}
									width={250}
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
										<rect x="20" y="20" rx="5" ry="5" width="160" height="10" />
										<rect x="20" y="40" rx="5" ry="5" width="160" height="10" />
										<rect x="20" y="60" rx="5" ry="5" width="160" height="10" />

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
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="pt-32 pb-6">
				<h1 className="flex justify-center font-bebas font-semibold text-8xl text-indigo-500 tracking-wide">
					ALL APPOINTMENTS.
				</h1>
			</div>

			<div className="flex flex-col py-6">
				<Filters
					selectedFilters={selectedSort}
					setSelectedFilters={setSelectedSort}
					filterType="sort"
				/>

				<div className="flex flex-wrap justify-center items-center gap-12 px-12 py-16">
					{appointments.map((appointment) => (
						<div key={appointment._id}>
							<AppointmentCard
								appointment={appointment}
								businessName={appointment.businessName}
								serviceName={appointment.service.title}
								serviceType={appointment.service.type}
								isLoading={isLoading}
							/>
						</div>
					))}
				</div>
			</div>
		</Layout>
	);
}

export default BusinessAppointments;
