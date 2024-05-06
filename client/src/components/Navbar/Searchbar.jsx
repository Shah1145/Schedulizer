function Searchbar() {
	return (
		<div className="lg:block xl:block flex items-center sm:hidden xs:hidden w-full max-w-lg lg:max-w-xs">
			<form method="get" action="#" className="flex items-center">
				<input
					id="search"
					type="text"
					placeholder="search for city, business, service, etc."
					className="flex items-center border-2 border-indigo-500 focus:border-indigo-600 mt-2 mr-2 mb-2 px-3 py-2 rounded-lg w-full font-muktaVaani text-black text-xs placeholder:text-grey-700 focus:outline-none"
				/>
				<button
					type="submit"
					id="searchsubmit"
					className="flex pl-3 transition duration-500 ease-in-out hover:scale-110"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						fill="#6366F1"
						height="1rem"
					>
						<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z" />
					</svg>
				</button>
			</form>
		</div>
	);
}

export default Searchbar;
