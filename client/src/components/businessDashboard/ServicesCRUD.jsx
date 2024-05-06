import { useSelector } from "react-redux";
import ServiceCRUDCard from "./ServiceCRUDCard";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import ServiceAddForm from "./ServiceAddForm";
import { Dialog, Transition } from "@headlessui/react";

function ServicesCRUD() {
	const [services, setServices] = useState([]);
	const selectedBusiness = useSelector((state) => state.business.businessData);
	const businessEmail = selectedBusiness?.workEmail;
	const [selectedService, setSelectedService] = useState(null);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const fetchServices = async () => {
		try {
			const response = await axios.get("/services/all");
			setServices(response.data.data);
		} catch (error) {
			console.error("Fetch error: ", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`/services/${id}`);
			fetchServices(); // Fetch the services after deleting
		} catch (error) {
			console.error("Fetch error: ", error);
		}
	};

	const handleAdd = async (newService) => {
		try {
			await axios.post("/services", newService);
			fetchServices(); // Fetch the services after adding
		} catch (error) {
			console.error("Fetch error: ", error);
		}
	};

	useEffect(() => {
		fetchServices(); // Fetch the services when the component mounts
	}, [businessEmail]);

	// console.log(services);
	return (
		<div>
			<ServiceAddForm onAdd={handleAdd} />
			<div className="flex flex-col justify-center items-center space-y-12 py-24">
				<h1 className="flex justify-center font-bebas font-semibold text-6xl text-indigo-500 tracking-wide">
					MANAGE YOUR SERVICES.
				</h1>
				<div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-16 pt-6">
					{services
						.filter((service) => service.businessEmail === businessEmail)
						.map((service, index) => (
							<ServiceCRUDCard
								key={index}
								service={service}
								onDelete={handleDelete}
								onEdit={() => {
									setSelectedService(service);
									setIsModalOpen(true);
								}} // Pass a function instead of calling the function
							/>
						))}
				</div>
			</div>
			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog
					as="div"
					className="pattern-topography-[#FAF8ED]/40 pattern-topography-scale-[0.5] z-10 fixed inset-0 items-center bg-indigo-600 overflow-y-auto"
					onClose={() => setIsModalOpen(false)} // Pass a function instead of calling the function
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
								className="font-bebas font-semibold text-5xl text-indigo-500 leading-2"
							>
								Edit Your Service.
							</Dialog.Title>
							<div className="mt-2">
								<div className="text-left">
									{isModalOpen && selectedService && (
										<ServiceAddForm
											service={selectedService}
											onAdd={handleAdd}
											isModalOpen={isModalOpen}
											setIsModalOpen={setIsModalOpen}
										/>
									)}
								</div>
							</div>
						</Dialog.Description>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}

export default ServicesCRUD;
