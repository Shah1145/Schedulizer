import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function CheckboxList({ label, items, onItemsChange, checkboxFor }) {
	const [selectedItems, setSelectedItems] = useState([]);

	const handleCheckboxChange = (item) => {
		setSelectedItems((prevSelectedItems) =>
			prevSelectedItems.includes(item)
				? prevSelectedItems.filter((selectedItem) => selectedItem !== item)
				: [...prevSelectedItems, item]
		);
	};

	useEffect(() => {
		onItemsChange(selectedItems);
	}, [selectedItems, onItemsChange]);

	// console.log(selectedItems);

	return (
		<div className="flex justify-between items-center pb-4 text-md text-middieBlue">
			<label className="inline-block pt-1 pl-[0.15rem] font-poppins text-sm">
				{label}:
			</label>
			{items.map((item) => (
				<div key={item} className="inline-flex items-center mr-4 pl-[1.5rem]">
					<input
						className="checked:after:block focus:after:block relative focus:after:z-[1] float-left checked:after:absolute focus:after:absolute checked:after:content-[''] focus:after:content-[''] border-[0.125rem] border-indigo-500 checked:after:border-[0.125rem] checked:border-indigo-600 checked:focus:after:border-[0.125rem] checked:focus:after:border-[#FAF8ED] checked:after:bg-transparent checked:bg-indigo-600 checked:focus:after:bg-transparent checked:before:opacity-[0.16] hover:before:opacity-[0.04] mt-[0.15rem] checked:after:-mt-px checked:focus:after:-mt-px mr-[6px] -ml-[1.5rem] checked:after:ml-[0.25rem] checked:focus:after:ml-[0.25rem] checked:after:border-t-0 checked:focus:after:border-t-0 checked:after:border-l-0 checked:focus:after:border-l-0 border-solid checked:after:border-solid checked:focus:after:border-solid rounded-[0.25rem] focus:after:rounded-[0.125rem] checked:focus:after:rounded-none w-[1.125rem] checked:after:w-[0.375rem] focus:after:w-[0.875rem] checked:focus:after:w-[0.375rem] h-[1.125rem] checked:after:h-[0.8125rem] focus:after:h-[0.875rem] checked:focus:after:h-[0.8125rem] focus:transition-[border-color_0.2s] hover:cursor-pointer appearance-none outline-none checked:after:rotate-45 checked:focus:after:rotate-45"
						type="checkbox"
						id={`${checkboxFor}${item}`}
						value={item.toLowerCase()}
						onChange={() => handleCheckboxChange(item.toLowerCase())}
					/>
					<label
						className="inline-block pt-1 pl-[0.15rem] font-poppins text-sm hover:cursor-pointer"
						htmlFor={`${checkboxFor}${item}`}
					>
						{item}
					</label>
				</div>
			))}
		</div>
	);
}

CheckboxList.propTypes = {
	onItemsChange: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(PropTypes.string).isRequired,
	checkboxFor: PropTypes.string.isRequired,
};

export default CheckboxList;
