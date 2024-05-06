import mongoose from "mongoose";

// Create Schema
const ServiceSchema = new mongoose.Schema(
	{
		businessId: [{ type: mongoose.Types.ObjectId, ref: "Business" }],
		title: {
			type: String,
			required: true,
		},
		duration: {
			type: Array,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		startTime: {
			type: String,
			required: true,
		},
		endTime: {
			type: String,
			required: true,
		},
		breakStartTime: {
			type: String,
			required: true,
		},
		breakEndTime: {
			type: String,
			required: true,
		},
		selectedDays: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		workEmail: {
			type: String,
			ref: "Business",
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointments" }],
	},
	{ collection: "services" }
);

// collection part
const Service = mongoose.model("Service", ServiceSchema);

export default Service;
