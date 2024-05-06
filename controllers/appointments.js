import Appointments from "../models/appointments.js";
import Service from "../models/services.js";
import { sendAppointmentConfirmationEmails } from "../middlewares/sendEmails.js";

// Add Services
export async function addAppointment(req, res) {
	const appointmentData = {
		userId: req.body.userId,
		serviceId: req.body.serviceId,
		date: req.body.appointmentDate,
		name: req.body.nameForAppointment,
		message: req.body.appointmentMessage,
		time: req.body.appointmentTime,
	};

	try {
		const createdAppointment = await Appointments.create(appointmentData);

		await Service.findByIdAndUpdate(req.body.serviceId, {
			$push: { services: createdAppointment._id },
		});

		// Send confirmation emails
		await sendAppointmentConfirmationEmails(createdAppointment._id);

		return res.status(200).send({
			success: true,
			message: "Appointment Created successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
}

export async function getAll(req, res) {
	try {
		const appointments = await Appointments.find();
		return res.status(200).send({
			success: true,
			message: "Appointments data fetched successfully",
			data: appointments,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
}

export async function getById(req, res) {
	const Id = req.params.id;

	try {
		const appointment = await Appointments.findById(Id);

		if (!appointment) {
			return res.status(404).send("Appointment not found");
		}

		return res.status(200).send({
			success: true,
			message: "Appointment fetched successfully",
			data: appointment,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
}

export async function updateById(req, res) {
	const Id = req.params.id;

	try {
		const existingAppointment = await Appointments.findById(Id);

		if (!existingAppointment) {
			return res.status(404).send("Service not found");
		}

		existingAppointment.date = req.body.date || existingAppointment.date;
		existingAppointment.name = req.body.name || existingAppointment.name;
		existingAppointment.message =
			req.body.message || existingAppointment.message;

		const updatedAppointment = await existingAppointment.save();

		return res.status(200).send({
			success: true,
			message: "Service updated successfully",
			data: updatedAppointment,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
}

export async function deleteById(req, res) {
	const Id = req.params.id;

	try {
		const existingAppointment = await Appointments.findById(Id);

		if (!existingAppointment) {
			return res.status(404).send("Service not found");
		}

		await Service.deleteOne({ _id: Id });

		return res
			.status(200)
			.json({ message: "Appointment deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
}
