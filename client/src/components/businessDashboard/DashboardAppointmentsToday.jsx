function DashboardAppointmentsToday() {
	return (
		<div className="">
			<h2 className="mb-4 font-poppins text-2xl font-bold">
				Todays Appointments
			</h2>

			<div className="space-y-6 font-muktaVaani">
				<div className="cursor-pointer space-y-2 rounded-xl shadow-sm shadow-indigo-800 bg-[#FAF8ED] p-4 text-gray-800 duration-500 hover:scale-105">
					<div className="flex justify-between">
						<div className="text-sm text-gray-400">Number 10</div>
						<div className="text-sm text-gray-400">4h ago</div>
					</div>
					<a href="#" className="text-lg font-bold">
						Blog and social posts
					</a>
					<div className="text-md text-gray-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							fill="#6366F1"
							className="mr-1 inline align-middle text-gray-800"
							viewBox="0 0 16 16">
							<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
						</svg>
						upcoming in 3 hours
					</div>
				</div>
				<div className="cursor-pointer space-y-2 rounded-xl shadow-sm shadow-indigo-800 bg-[#FAF8ED] p-4 text-gray-800 duration-500 hover:scale-105">
					<div className="flex justify-between">
						<div className="text-sm text-gray-400">Number 10</div>
						<div className="text-sm text-gray-400">4h ago</div>
					</div>
					<a href="#" className="text-lg font-bold">
						Blog and social posts
					</a>
					<div className="text-md text-gray-600">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							fill="#6366F1"
							className="mr-1 inline align-middle text-gray-800"
							viewBox="0 0 16 16">
							<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
						</svg>
						upcoming in 3 hours
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardAppointmentsToday;
