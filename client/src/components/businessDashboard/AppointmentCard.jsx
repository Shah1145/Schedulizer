import PropTypes from "prop-types";
import { differenceInDays } from "date-fns";
import { useState } from "react";

function AppointmentCard({ appointment, serviceName, serviceType }) {
	// Convert the date string to a Date object
	const date = new Date(appointment?.date);

	// Format the date as dd/mm/yy
	const formattedDate = `${date.getDate()} / ${date.getMonth() + 1} / ${date
		.getFullYear()
		.toString()
		.slice(-2)}`;

	// Get the day of the week
	const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	const day = days[date.getDay()];

	// Convert 12-hour format to 24-hour format
	const convertTo24Hour = (time) => {
		const [hour, minutePeriod] = time.split(":");
		const [minute, period] = minutePeriod.split(" ");

		let newHour = hour;
		if (period === "PM" && hour < 12) newHour = 12 + parseInt(hour);
		if (period === "AM" && hour === "12") newHour = 0;

		return [newHour, minute];
	};

	// Extract the start time and end time
	const [startTime, endTime] = appointment.time.split(" to ");

	// Convert start time and end time to 24-hour format
	const [startHour, startMinutes] = convertTo24Hour(startTime);
	const [endHour, endMinutes] = convertTo24Hour(endTime);

	// Calculate the duration
	const duration = (endHour - startHour) * 60 + (endMinutes - startMinutes);

	const today = new Date();
	const appointmentDate = new Date(appointment.date); // assuming appointment.date is in a format that can be parsed by Date

	const [statusColor, setStatusColor] = useState("text-green-500");

	if (appointmentDate >= today) {
		const daysUntilAppointment = differenceInDays(appointmentDate, today);
		if (daysUntilAppointment <= 2) {
			setStatusColor("text-red-500"); // red if the appointment is in 2 days or less
		} else if (daysUntilAppointment <= 7) {
			setStatusColor("text-yellow-500"); // yellow if the appointment is in 7 days or less
		} else {
			setStatusColor("text-green-500"); // green if the appointment is in more than 7 days
		}
	} else {
		setStatusColor("text-gray-500"); // gray if the appointment has passed
	}

	return (
		<div className="flex justify-center items-center space-x-2">
			<div className="inline-flex flex-col justify-center items-center gap-5 bg-indigo-500 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-2 rounded-2xl md:max-w-sm break-words cursor-default">
				<div className="flex flex-col justify-center items-center space-y-2 font-muktaVaani text-[#FAF8ED] text-xs">
					<div>
						<span className="font-semibold">{startTime}</span>
					</div>

					<div>
						<span className="font-semibold">
							{day} : {formattedDate}
						</span>
					</div>

					<div>
						<span className="font-semibold">{duration} mins</span>
					</div>
				</div>
			</div>

			<div className="inline-flex flex-col justify-center items-center gap-5 border-2 border-indigo-500 bg-[#FAF8ED] shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-4 rounded-2xl md:max-w-sm break-words cursor-default">
				<div className="flex flex-col justify-start space-y-4">
					<div className="flex justify-center items-center space-x-4">
						<div className="font-light font-muktaVaani text-black text-xs">
							{serviceType}
						</div>

						<div className="font-poppins font-semibold text-black text-xs">
							{serviceName}
						</div>

						<div
							className={`font-light font-muktaVaani ${statusColor} text-xs`}
						>
							{appointment.status}
						</div>
					</div>

					<div className="font-muktaVaani font-semibold text-black text-sm">
						Customer Name:{" "}
						<span className="font-normal">{appointment.name}</span>
					</div>
				</div>
			</div>
		</div>
	);
}

AppointmentCard.propTypes = {
	appointment: PropTypes.shape({
		name: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
		time: PropTypes.string.isRequired,
		status: PropTypes.string,
	}).isRequired,
	serviceName: PropTypes.string.isRequired,
	serviceType: PropTypes.string,
};

export default AppointmentCard;
