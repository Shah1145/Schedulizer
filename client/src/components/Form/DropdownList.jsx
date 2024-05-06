import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

function DropdownList({
	dropdowListOpen,
	listLength,
	handleOptionSelect,
	dropdownliname,
}) {
	const listItems = Array.from({ length: listLength }, (_, index) => (
		<li key={index}>
			<a
				className="text-md block w-full whitespace-nowrap bg-transparent px-4 py-2 font-muktaVaani font-normal text-neutral-700 hover:bg-indigo-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
				href="#"
				data-te-dropdown-item-ref
				onClick={(event) => handleOptionSelect(index, event)}>
				{dropdownliname(index)}
			</a>
		</li>
	));

	const dropdownRef = useRef(null);

	useEffect(() => {
		if (dropdownRef.current) {
			const rect = dropdownRef.current.getBoundingClientRect();
			const maxHeight = window.innerHeight - rect.top;
			dropdownRef.current.style.maxHeight = `${maxHeight}px`;
		}
	}, [dropdowListOpen]);

	const listClassNames = `absolute z-10 float-left m-0 ${
		dropdowListOpen ? "" : "hidden"
	} w-full overflow-y-auto min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block`;

	return (
		<ul
			ref={dropdownRef}
			className={listClassNames}
			aria-labelledby="dropdownMenuButton1"
			data-te-dropdown-menu-ref>
			{listItems}
		</ul>
	);
}

DropdownList.propTypes = {
	listLength: PropTypes.number.isRequired,
	handleOptionSelect: PropTypes.func.isRequired,
	dropdownliname: PropTypes.func.isRequired,
	dropdowListOpen: PropTypes.bool.isRequired,
};

export default DropdownList;
