import ServiceCard from "./ServiceCard";
import BackToTopButton from "./BackToTopButton";
// import Ratings from "./Ratings";
// import InputField from "./form/InputField";
import Layout from "./Layout";
// import Button from "./Button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BusinessInfo() {
	const { businessName } = useParams();
	const [business, setBusiness] = useState([]);
	const [services, setServices] = useState([]);

	const imagePath = business.profilePicture
		? business.profilePicture.replace("public/", "/backend/public/")
		: "";

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`/business/all`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const businessData = await response.json();
				const matchingBusiness = businessData.find(
					(business) => business.name === businessName
				);
				setBusiness(matchingBusiness);

				const servicesResponse = await fetch("/services/all");
				if (!servicesResponse.ok) {
					throw new Error(`HTTP error! status: ${servicesResponse.status}`);
				}
				const servicesData = await servicesResponse.json();
				console.log("servicesData: ", servicesData.data);

				servicesData.data.forEach((service) => {
					console.log("Service business id: ", service.businessId);
				});

				const matchingServices = servicesData.data.filter((service) =>
					service.businessId.includes(matchingBusiness._id)
				);

				console.log("matching services:", matchingServices);
				setServices(matchingServices);
			} catch (error) {
				console.error("Fetch error: ", error);
			}
		};

		fetchData(businessName);
	}, [businessName]); // Removed 'business' from the dependency array

	return (
		<Layout>
			<div className="pt-32 pb-12">
				<h1 className="flex justify-center font-bebas font-semibold text-8xl text-indigo-500 tracking-wide">
					BUSINESS INFO.
				</h1>

				<div className="flex justify-center items-center space-x-6 py-12">
					<div className="flex flex-col justify-center items-center space-y-6 border-2 border-indigo-500 bg-[#FAF8ED] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-8 rounded-2xl break-words group">
						<div className="flex flex-col justify-center items-center space-y-4">
							<img
								className="border-2 border-black rounded-full w-20 h-20"
								src={imagePath}
								alt="Profile"
							/>
							<div className="flex flex-col justify-center items-center">
								<div className="font-poppins font-semibold text-black text-lg">
									{business.name}
								</div>
								<div className="flex justify-between space-x-6">
									<div className="font-muktaVaani text-black text-xs">
										{business.category}
									</div>
									<div className="font-muktaVaani text-black text-xs">
										{business.city}
									</div>
									<div className="font-muktaVaani text-black text-xs">
										Rating: 4.5 / 5
									</div>
								</div>
							</div>
						</div>
						<div className="flex justify-center items-center w-96 font-muktaVaani font-normal text-black text-center text-sm">
							{business.bio}
						</div>
					</div>
				</div>

				<div className="py-12">
					<h1 className="flex justify-center font-bebas font-semibold text-6xl text-indigo-500 tracking-wide">
						SERVICES.
					</h1>
					<div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-16 py-12">
						{services &&
							services.map((service, index) => (
								<ServiceCard
									key={index}
									service={service}
									businessName={business.name}
								/>
							))}
					</div>
				</div>
			</div>
			<BackToTopButton />
		</Layout>
	);
}

export default BusinessInfo;
