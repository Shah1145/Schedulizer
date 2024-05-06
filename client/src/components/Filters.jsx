import TimeSlotSelectorButton from "./form/TimeSlotSelectorButton";
import PropTypes from "prop-types";

function Filters({ selectedFilters = [], setSelectedFilters, filterType }) {
	if (typeof setSelectedFilters !== "function") {
		throw new Error("setSelectedFilters must be a function");
	}

	const filterOptions = {
		categories: [
			"IT / Tech",
			"Cosmetic",
			"Fitness",
			"Consulting",
			"Finance",
			"Education",
			"Government",
			"Medical",
			"Music",
			"Art",
			"Clothing",
			"Auto",
			"Psychology",
			"Business",
		],
		duration: ["15 mins", "30 mins", "45 mins", "1 hour", "2 hours", "4 hours"],
		priceRanges: [
			"Rs. 1,000 - Rs. 3,000",
			"Rs. 3,000 - Rs. 5,000",
			"Rs. 5,000 - Rs. 10,000",
		],
		cities: [
			"Karachi",
			"Lahore",
			"Islamabad",
			"Rawalpindi",
			"Peshawar",
			"Quetta",
			"Multan",
			"Hyderabad",
			"Gujranwala",
		],
		sort: ["MONTH", "YEAR", "DURATION", "NEWEST", "OLDEST"],
	};

	const filters = filterOptions[filterType];

	const handleButtonClick = (filter) => {
		if (filterType === "sort") {
			if (selectedFilters.includes(filter)) {
				setSelectedFilters([]);
			} else {
				setSelectedFilters([filter]);
			}
		} else {
			if (selectedFilters.includes(filter)) {
				setSelectedFilters(selectedFilters.filter((f) => f !== filter));
			} else {
				setSelectedFilters([...selectedFilters, filter]);
			}
		}
	};

	return (
		<div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-4 px-20 pt-12">
			<p className="inline-flex font-medium font-ptSansCaption text-center text-sm">
				{filterType}:
			</p>
			{filters.map((filter) => (
				<TimeSlotSelectorButton
					key={filter}
					isSelected={selectedFilters.includes(filter)}
					onClick={() => handleButtonClick(filter)}
					clearSelection={() => handleButtonClick(filter)}
					buttonName={filter}
				/>
			))}
		</div>
	);
}

Filters.propTypes = {
	selectedFilters: PropTypes.arrayOf(PropTypes.string),
	setSelectedFilters: PropTypes.func.isRequired,
	filterType: PropTypes.oneOf([
		"categories",
		"cities",
		"duration",
		"priceRanges",
		"sort",
	]).isRequired,
};

export default Filters;
