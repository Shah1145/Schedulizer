import { useSpring, animated } from "@react-spring/web";

function DashboardAppointmentTracker() {
	const { barPlayhead } = useSpring({
		barPlayhead: 1,
		from: { barPlayhead: 0 },
	});

	return (
		<div className="flex flex-col space-y-6 font-muktaVaani">
			<h2 className="text-center font-poppins text-2xl font-bold">
				Tasks Tracker
			</h2>
			<div className="flex space-x-4">
				<div className="rounded-xl shadow-sm shadow-indigo-800 bg-[#FAF8ED] p-4 text-gray-800">
					<div className="text-2xl font-bold leading-none">20</div>
					<div className="mt-2">Tasks finished this week</div>
				</div>
				<div className="rounded-xl shadow-sm shadow-indigo-800 bg-[#FAF8ED] p-4 text-gray-800">
					<div className="text-2xl font-bold leading-none">5.5</div>
					<div className="mt-2">Tracked hours this week</div>
				</div>
			</div>
			<div className="col-span-2 rounded-xl shadow-sm shadow-indigo-800 bg-[#FAF8ED]">
				<div className="rounded-lg p-4 text-gray-800">
					<div className="text-xl font-bold leading-none">
						Your daily appointments
					</div>
					<div className="mt-2">5 of 8 completed</div>
					<svg
						className="mt-3 w-44"
						height="6"
						viewBox="0 0 200 6"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<rect width="200" height="6" rx="3" fill="#E0E7FF" />
						<animated.rect
							width={barPlayhead.to((i) => i * (3 / 5) * 200)}
							height="6"
							rx="3"
							fill="url(#paint0_linear)"
						/>
						<rect x="38" width="2" height="6" fill="white" />
						<rect x="78" width="2" height="6" fill="white" />
						<rect x="118" width="2" height="6" fill="white" />
						<rect x="158" width="2" height="6" fill="white" />
						<defs>
							<linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
								<stop stopColor="#A5B4FC" />
								<stop offset="1" stopColor="#6366F1" />
							</linearGradient>
						</defs>
					</svg>
				</div>
			</div>
		</div>
	);
}

export default DashboardAppointmentTracker;
