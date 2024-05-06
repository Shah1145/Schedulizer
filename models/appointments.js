import mongoose from "mongoose";
// Create Schema
const appointmentSchema = new mongoose.Schema({
	userId: [{ type: mongoose.Types.ObjectId, ref: "User" }],
	serviceId: [{ type: mongoose.Types.ObjectId, ref: "Service" }],
	date: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
});

const Appointments = mongoose.model("appointments", appointmentSchema);

// collection part

export default Appointments;
