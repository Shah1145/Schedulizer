import PropTypes from "prop-types";
import Button from "./Button";
import { animate } from "motion";
import { useSelector } from "react-redux";
import { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import VanillaTilt from "./VanillaTilt";

function ServiceCard({ service, businessName, businessId }) {
	const isUserSignedIn = useSelector((state) => state.user.isUserSignedIn);
	const isBusinessRegistered = useSelector(
		(state) => state.business.isBusinessRegistered
	);

	useEffect(() => {
		animate(
			".description",
			{ scale: [0.9, 1], opacity: [0, 1] },
			{ duration: 1.5 }
		);
		animate(".serviceDetails", { opacity: [-1, 1] }, { duration: 1.5 });
	});

	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);

	useEffect(() => {
		if (isModalOpen || isBusinessModalOpen === true) {
			const timer = setTimeout(() => {
				navigate("/schedulizer/signin");
			}, 6000); // 4000 milliseconds = 4 seconds

			// Cleanup function to clear the timeout when the component is unmounted or when isModalOpen changes
			return () => clearTimeout(timer);
		}
	}, [isModalOpen, isBusinessModalOpen, navigate]);

	console.log(service);
	if (!service || !service.duration) {
		return <div>Loading...</div>; // or some other loading indicator
	}

	const timing = `${service.startTime} to ${service.endTime}`;
	return (
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
								{service.title}
							</div>
							<div className="font-extralight font-muktaVaani text-black text-sm">
								by <span className="font-light">{businessName}</span>
							</div>
						</div>

						<div className="flex flex-col justify-center items-center space-x-4 font-muktaVaani text-black text-xs serviceDetails">
							<div className="flex justify-start space-x-6">
								<div>
									Duration:
									<span className="font-semibold">{service?.duration[0]}</span>
								</div>
								<div>
									Price:{" "}
									<span className="font-semibold">Rs.{service.price}</span>
								</div>
							</div>
							<div className="flex justify-start space-x-6">
								<div>
									Timings: <span className="font-semibold">{timing}</span>
								</div>
								<div>
									Days: <span className="font-semibold">{service.days}</span>
								</div>
							</div>
						</div>
					</div>

					<div className="flex flex-wrap py-2 font-muktaVaani font-normal text-black text-center text-sm break-words description">
						{service.description.substring(0, 250)}
					</div>

					<div className="pt-2 appointmentButton">
						<Button
							buttonName="BOOK APPOINTMENT"
							onClick={() => {
								if (isUserSignedIn) {
									if (isBusinessRegistered) {
										setIsBusinessModalOpen(true);
									} else {
										navigate(
											`/schedulizer/appointmentform/${businessName}/${service.title}`,
											{
												state: {
													serviceId: service._id,
													businessId: businessId,
												}, // Pass data via state
											}
										);
									}
								} else {
									setIsModalOpen(true);
								}
							}}
						/>
					</div>
				</div>

				<Transition appear show={isModalOpen} as={Fragment}>
					<Dialog
						as="div"
						className="pattern-topography-[#FAF8ED]/40 pattern-topography-scale-[0.5] z-10 fixed inset-0 bg-indigo-600 overflow-y-auto"
						onClose={() => setIsModalOpen(false)}
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
								className="inline-block space-y-6 bg-[#FAF8ED] my-8 p-12 rounded-2xl w-full max-w-lg text-center transform transition-all overflow-hidden align-middle"
							>
								<Dialog.Title
									as="h1"
									className="font-bebas font-semibold text-5xl text-indigo-500 leading-2"
								>
									Access Denied. <br /> Sign In Required!
								</Dialog.Title>
								<div className="mt-2">
									<p className="font-poppins text-black text-sm">
										You&rsquo;re not signed in. Please sign in to book an
										appointment. Redirecting you to the sign-in page...
									</p>
								</div>
							</Dialog.Description>
						</div>
					</Dialog>
				</Transition>

				<Transition appear show={isBusinessModalOpen} as={Fragment}>
					<Dialog
						as="div"
						className="pattern-topography-[#FAF8ED]/40 pattern-topography-scale-[0.5] z-10 fixed inset-0 bg-indigo-600 overflow-y-auto"
						onClose={() => setIsBusinessModalOpen(false)}
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
								className="inline-block space-y-6 bg-[#FAF8ED] my-8 p-12 rounded-2xl w-full max-w-xl text-center transform transition-all overflow-hidden align-middle"
							>
								<Dialog.Title
									as="h1"
									className="font-bebas font-semibold text-5xl text-indigo-500 leading-2"
								>
									Access Denied. <br /> Business Account Detected!
								</Dialog.Title>
								<div className="mt-2">
									<p className="font-poppins text-black text-sm">
										You&rsquo;re signed in as a business. Please sign in as a
										user to book an appointment. Redirecting you to the sign-in
										page...
									</p>
								</div>
							</Dialog.Description>
						</div>
					</Dialog>
				</Transition>
			</div>
		</VanillaTilt>
	);
}

ServiceCard.propTypes = {
	service: PropTypes.shape({
		title: PropTypes.string.isRequired,
		duration: PropTypes.array.isRequired,
		price: PropTypes.number.isRequired,
		description: PropTypes.string.isRequired,
		days: PropTypes.string.isRequired,
		_id: PropTypes.string.isRequired,
		startTime: PropTypes.string.isRequired,
		endTime: PropTypes.string.isRequired,
	}).isRequired,
	businessName: PropTypes.string.isRequired,
	businessId: PropTypes.string.isRequired,
};

export default ServiceCard;
