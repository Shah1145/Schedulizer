import { useEffect, useState } from "react";
import BusinessCard from "./BusinessCard";
import Filters from "./Filters";
import Layout from "./Layout";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ContentLoader from "react-content-loader";

function Businesses() {
	const [businesses, setBusinesses] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedCities, setSelectedCities] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await fetch("/businesses/all");
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setBusinesses(data);
				console.log("Fetched businesses: ", data); // Log fetched businesses
			} catch (error) {
				console.error("Fetch error: ", error);
			}
			setIsLoading(false);
		};

		fetchData();
	}, []);

	// console.log("Selected categories: ", selectedCategories); // Log selected categories
	// console.log("Selected cities: ", selectedCities); // Log selected cities

	if (isLoading) {
		return (
			<Layout>
				<div className="pt-32">
					<h1 className="flex justify-center font-bebas font-semibold text-8xl text-indigo-500 tracking-wide">
						BUSINESSES.
					</h1>
				</div>

				<Filters
					selectedFilters={selectedCategories}
					setSelectedFilters={setSelectedCategories}
					filterType="categories"
				/>

				<Filters
					selectedFilters={selectedCities}
					setSelectedFilters={setSelectedCities}
					filterType="cities"
				/>

				<div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-16 py-12">
					{[...Array(20)].map((_, i) => (
						<div key={i} className="appointment-card-skeleton">
							<Skeleton
								height={230}
								width={400}
								baseColor="#667eea" // Indigo-500
								highlightColor="#7f9cf5" // A lighter shade of Indigo for the animation highlight
								duration={2} // Speed of the animation
								enableAnimation
								borderRadius="1rem"
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
					))}
				</div>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="pt-32">
				<h1 className="flex justify-center font-bebas font-semibold text-8xl text-indigo-500 tracking-wide">
					BUSINESSES.
				</h1>
			</div>
			<Filters
				selectedFilters={selectedCategories}
				setSelectedFilters={setSelectedCategories}
				filterType="categories"
			/>
			<Filters
				selectedFilters={selectedCities}
				setSelectedFilters={setSelectedCities}
				filterType="cities"
			/>
			<div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-16 py-12">
				{businesses
					.filter(
						(business) =>
							(selectedCategories.length === 0 ||
								selectedCategories.includes(business.category)) &&
							(selectedCities.length === 0 ||
								selectedCities.includes(business.city))
					)
					.map((business, index) => (
						<BusinessCard key={index} business={business} />
					))}
				{businesses.filter(
					(business) =>
						(selectedCategories.length === 0 ||
							selectedCategories.includes(business.category)) &&
						(selectedCities.length === 0 ||
							selectedCities.includes(business.city))
				).length === 0 && (
					<p className="py-12 font-muktaVaani text-lg text-red-500">
						No results found
					</p>
				)}
			</div>
		</Layout>
	);
}

export default Businesses;
