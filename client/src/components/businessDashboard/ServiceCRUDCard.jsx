import PropTypes from "prop-types";
import VanillaTilt from "../VanillaTilt";

function ServicesCRUDCard({ service, onDelete, onEdit }) {
	const handleServiceDelete = () => {
		onDelete(service._id);
	};

	const handleServiceUpadte = () => {
		onEdit();
	};

	// console.log("ServiceCRUDCard props:", { service, onDelete }); // Log the props
	const timing = `${service?.startTime} to ${service?.endTime}`;

	return (
		<VanillaTilt
			options={{
				max: 1,
				scale: 1.01,
				perspective: 500,
				speed: 800,
				transformStyle: "preserve-3d",
			}}
		>
			<div className="inline-flex flex-col justify-center items-center gap-5 border-2 border-indigo-500 hover:border-indigo-600 bg-[#FAF8ED] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-6 border-lightie-green rounded-2xl md:max-w-sm break-words duration-500 cursor-default ease-in-out group">
				<div className="flex flex-col justify-center items-center gap-y-7">
					<div className="flex flex-col space-y-4">
						<div className="flex justify-between px-4 text-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								height="1.2rem"
								onClick={handleServiceUpadte}
								className="transition-transform duration-500 hover:cursor-pointer fill-indigo-500 hover:fill-indigo-600 hover:scale-105 ease-in-out"
							>
								<path d="M373.1 24.97C401.2-3.147 446.8-3.147 474.9 24.97L487 37.09C515.1 65.21 515.1 105.8 487 138.9L289.8 336.2C281.1 344.8 270.4 351.1 258.6 354.5L158.6 383.1C150.2 385.5 141.2 383.1 135 376.1C128.9 370.8 126.5 361.8 128.9 353.4L157.5 253.4C160.9 241.6 167.2 230.9 175.8 222.2L373.1 24.97zM440.1 58.91C431.6 49.54 416.4 49.54 407 58.91L377.9 88L424 134.1L453.1 104.1C462.5 95.6 462.5 80.4 453.1 71.03L440.1 58.91zM203.7 266.6L186.9 325.1L245.4 308.3C249.4 307.2 252.9 305.1 255.8 302.2L390.1 168L344 121.9L209.8 256.2C206.9 259.1 204.8 262.6 203.7 266.6zM200 64C213.3 64 224 74.75 224 88C224 101.3 213.3 112 200 112H88C65.91 112 48 129.9 48 152V424C48 446.1 65.91 464 88 464H360C382.1 464 400 446.1 400 424V312C400 298.7 410.7 288 424 288C437.3 288 448 298.7 448 312V424C448 472.6 408.6 512 360 512H88C39.4 512 0 472.6 0 424V152C0 103.4 39.4 64 88 64H200z" />
							</svg>

							<div className="font-poppins font-semibold text-base text-black">
								{service.title}
							</div>

							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								height="1.2rem"
								onClick={handleServiceDelete}
								className="transition-transform duration-500 hover:cursor-pointer fill-indigo-500 hover:scale-105 ease-in-out hover:fill-indigo-600"
							>
								<path d="M160 400C160 408.8 152.8 416 144 416C135.2 416 128 408.8 128 400V192C128 183.2 135.2 176 144 176C152.8 176 160 183.2 160 192V400zM240 400C240 408.8 232.8 416 224 416C215.2 416 208 408.8 208 400V192C208 183.2 215.2 176 224 176C232.8 176 240 183.2 240 192V400zM320 400C320 408.8 312.8 416 304 416C295.2 416 288 408.8 288 400V192C288 183.2 295.2 176 304 176C312.8 176 320 183.2 320 192V400zM317.5 24.94L354.2 80H424C437.3 80 448 90.75 448 104C448 117.3 437.3 128 424 128H416V432C416 476.2 380.2 512 336 512H112C67.82 512 32 476.2 32 432V128H24C10.75 128 0 117.3 0 104C0 90.75 10.75 80 24 80H93.82L130.5 24.94C140.9 9.357 158.4 0 177.1 0H270.9C289.6 0 307.1 9.358 317.5 24.94H317.5zM151.5 80H296.5L277.5 51.56C276 49.34 273.5 48 270.9 48H177.1C174.5 48 171.1 49.34 170.5 51.56L151.5 80zM80 432C80 449.7 94.33 464 112 464H336C353.7 464 368 449.7 368 432V128H80V432z" />
							</svg>
						</div>

						<div className="flex flex-wrap justify-center items-center space-x-4 font-muktaVaani text-black text-xs serviceDetails">
							<div>
								Duration: <strong>{service.duration[0]}</strong>
							</div>
							<div>
								Price: Rs. <strong>{service.price}</strong>
							</div>
							<div>
								Timings: <strong>{timing}</strong>
							</div>
							<div>
								Days: <strong>{service.days}</strong>
							</div>
						</div>
					</div>

					<div className="font-muktaVaani font-normal text-black text-center text-sm break-words description">
						{service.description.substring(0, 250)}
					</div>
				</div>
			</div>
		</VanillaTilt>
	);
}

ServicesCRUDCard.propTypes = {
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
	onDelete: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
};

export default ServicesCRUDCard;
