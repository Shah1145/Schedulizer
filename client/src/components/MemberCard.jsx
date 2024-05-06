import PropTypes from "prop-types"; // Import PropTypes
import VanillaTilt from "./VanillaTilt";

function MemberCard({ member }) {
	return (
		<VanillaTilt
			options={{
				max: 3,
				scale: 1.01,
				perspective: 500,
				speed: 800,
				transformStyle: "preserve-3d",
			}}
		>
			<div className="border-2 border-indigo-500 hover:border-indigo-600 bg-[#FAF8ED] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] lg:mb-0 p-8 rounded-xl transition-all duration-500 cursor-default">
				<img
					className="border-[#2B3467] mx-auto mb-6 h-16"
					src={member.profileImageSrc}
					alt="avatar"
				/>

				<h5 className="mb-4 font-poppins font-semibold">{member.name}</h5>
				<p className="mb-6 font-light font-muktaVaani text-sm">
					{member.designation}
				</p>

				<ul className="flex justify-center space-x-2 mx-auto list-inside">
					<a href={member.socialLinks.twitter} className="px-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 512 512"
							className="duration-200 ease-in-out fill-indigo-500 hover:scale-105 hover:fill-indigo-600"
						>
							<path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
						</svg>
					</a>

					<a href={member.socialLinks.linkedin} className="px-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 448 512"
							className="duration-200 ease-in-out fill-indigo-500 hover:scale-105 hover:fill-indigo-600"
						>
							<path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
						</svg>
					</a>

					<a href={member.socialLinks.dribbble} className="px-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="1em"
							viewBox="0 0 512 512"
							className="duration-200 ease-in-out fill-indigo-500 hover:scale-105 hover:fill-indigo-600"
						>
							<path d="M86.6 64l85.2 85.2C194.5 121.7 208 86.4 208 48c0-14.7-2-28.9-5.7-42.4C158.6 15 119 35.5 86.6 64zM64 86.6C35.5 119 15 158.6 5.6 202.3C19.1 206 33.3 208 48 208c38.4 0 73.7-13.5 101.3-36.1L64 86.6zM256 0c-7.3 0-14.6 .3-21.8 .9C238 16 240 31.8 240 48c0 47.3-17.1 90.5-45.4 124L256 233.4 425.4 64C380.2 24.2 320.9 0 256 0zM48 240c-16.2 0-32-2-47.1-5.8C.3 241.4 0 248.7 0 256c0 64.9 24.2 124.2 64 169.4L233.4 256 172 194.6C138.5 222.9 95.3 240 48 240zm463.1 37.8c.6-7.2 .9-14.5 .9-21.8c0-64.9-24.2-124.2-64-169.4L278.6 256 340 317.4c33.4-28.3 76.7-45.4 124-45.4c16.2 0 32 2 47.1 5.8zm-4.7 31.9C492.9 306 478.7 304 464 304c-38.4 0-73.7 13.5-101.3 36.1L448 425.4c28.5-32.3 49.1-71.9 58.4-115.7zM340.1 362.7C317.5 390.3 304 425.6 304 464c0 14.7 2 28.9 5.7 42.4C353.4 497 393 476.5 425.4 448l-85.2-85.2zM317.4 340L256 278.6 86.6 448c45.1 39.8 104.4 64 169.4 64c7.3 0 14.6-.3 21.8-.9C274 496 272 480.2 272 464c0-47.3 17.1-90.5 45.4-124z" />
						</svg>
					</a>
				</ul>
			</div>
		</VanillaTilt>
	);
}

MemberCard.propTypes = {
	member: PropTypes.shape({
		profileImageSrc: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		designation: PropTypes.string.isRequired,
		socialLinks: PropTypes.shape({
			instagram: PropTypes.string,
			linkedin: PropTypes.string,
			dribbble: PropTypes.string,
			twitter: PropTypes.string,
		}).isRequired,
	}).isRequired,
};

export default MemberCard;
