import Service from "../models/services.js";
import Business from "../models/businesses.js";

// Add Services
export async function addServices(req, res) {
	const serviceData = {
		businessId: req.body.businessId,
		title: req.body.serviceTitle,
		duration: req.body.serviceDuration,
		price: req.body.servicePrice,
		startTime: req.body.serviceStartTime,
		endTime: req.body.serviceEndTime,
		breakStartTime: req.body.breakStartTime,
		breakEndTime: req.body.breakEndTime,
		days: req.body.selectedDays,
		description: req.body.serviceDescription,
		businessEmail: req.body.businessEmail,
		type: req.body.serviceType,
		category: req.body.businessCategory,
	};

	try {
		const createdService = await Service.create(serviceData);

		await Business.findByIdAndUpdate(req.body.businessId, {
			$push: { services: createdService._id },
		});

		return res.status(200).send({
			success: true,
			message: "Service added successfully",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
}

export async function getAll(req, res) {
	try {
		const services = await Service.find();
		return res.status(200).send({
			success: true,
			message: "Services data fetched successfully",
			data: services,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
}

export async function getById(req, res) {
	const Id = req.params.id;

	try {
		const service = await Service.findById(Id);

		if (!service) {
			return res.status(404).send("Service not found");
		}

		return res.status(200).send({
			success: true,
			message: "Service fetched successfully",
			data: service,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
}

export async function updateById(req, res) {
	const Id = req.params.id;

	try {
		const existingService = await Service.findById(Id);

		if (!existingService) {
			return res.status(404).send("Service not found");
		}

		existingService.title = req.body.title || existingService.title;
		existingService.duration = req.body.duration || existingService.duration;
		existingService.price = req.body.price || existingService.price;
		existingService.startTime = req.body.startTime || existingService.startTime;
		existingService.endTime = req.body.endTime || existingService.endTime;
		existingService.breakStartTime =
			req.body.breakStartTime || existingService.breakStartTime;
		existingService.breakEndTime =
			req.body.breakEndTime || existingService.breakEndTime;
		existingService.selectedDays =
			req.body.selectedDays || existingService.selectedDays;
		existingService.description =
			req.body.description || existingService.description;

		const updatedService = await existingService.save();

		return res.status(200).send({
			success: true,
			message: "Service updated successfully",
			data: updatedService,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
}

export async function deleteById(req, res) {
	const Id = req.params.id;

	try {
		const existingService = await Service.findById(Id);

		if (!existingService) {
			return res.status(404).send("Service not found");
		}

		await Service.deleteOne({ _id: Id });

		return res.status(200).json({ message: "Service deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
}
