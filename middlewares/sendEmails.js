import nodemailer from "nodemailer";
import Appointments from "../models/appointments.js";
import Business from "../models/businesses.js";
import Service from "../models/services.js";
import User from "../models/user.js";

// Function to send email
async function sendEmail(userEmail, businessEmail, subject, message) {
	// Create a nodemailer transporter
	let transporter = nodemailer.createTransport({
		port: 465,
		service: "gmail",
		auth: {
			user: "fisakhan0347@gmail.com",
			pass: "mnqi jalg hxqf wkix",
		},
	});

	// Email options for user
	let userMailOptions = {
		from: "fisakhan0347@gmail.com",
		to: userEmail,
		subject: subject,
		text: message,
	};

	// Email options for business
	let businessMailOptions = {
		from: "fisakhan0347@gmail.com",
		to: businessEmail,
		subject: subject,
		text: message,
	};

	try {
		// Send email to user
		let userInfo = await transporter.sendMail(userMailOptions);
		console.log("Email sent to user:", userInfo);

		// Send email to business
		let businessInfo = await transporter.sendMail(businessMailOptions);
		console.log("Email sent to business:", businessInfo);
	} catch (error) {
		console.error("Error sending email:", error);
	}
}

// Function to send appointment confirmation emails
export const sendAppointmentConfirmationEmails = async (appointmentId) => {
	try {
		// Find appointment details
		const appointment = await Appointments.findById(appointmentId).populate(
			"userId serviceId"
		);
		if (!appointment) {
			console.error("Appointment not found!");
			return;
		}
		const service = await Service.findById(appointment.serviceId);
		if (!service || !service.businessId) {
			console.error("Service or business not found!");
			return;
		}

		const business = await Business.findById(service.businessId);
		if (!business || !business.workEmail) {
			console.error("Business workMail not found!");
			return;
		}

		const businessEmail = business.workEmail;

		// Get user and business email addresses
		const user = await User.findById(appointment.userId);
		if (!user || !user.userEmail) {
			console.error(" User Email not found!");
			return;
		}
		const userEmail = user.userEmail;

		// Compose email message
		const subject = "Appointment Confirmation";
		const message = `Dear ${business.name},\n\nYour appointment has been confirmed.\n\nRegards,\nThe Appointment Team`;

		// Send email to user and business
		await sendEmail(userEmail, businessEmail, subject, message);
	} catch (error) {
		console.error("Error sending appointment confirmation emails:", error);
	}
};
