import Business from "../models/businesses.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

// Register Business
export const registeredBusiness = async (req, res) => {
	// This will log the request body

	const data = {
		name: req.body.businessName,
		contactNumber: req.body.businessContactNumber,
		workEmail: req.body.businessEmail,
		userEmail: req.body.userEmail,
		category: req.body.businessCategory,
		city: req.body.businessCity,
		mapLink: req.body.businessMapLink,
		address: req.body.businessAddress,
		bio: req.body.businessBio,
		profilePicture: req.file.path,
	};

	if (
		!data.name ||
		!data.contactNumber ||
		!data.workEmail ||
		!data.userEmail ||
		!data.category ||
		!data.city ||
		!data.mapLink ||
		!data.address ||
		!data.bio ||
		!data.profilePicture
	) {
		return res.status(400).send("All Fields are required.");
	}

	try {
		const existingUser = await Business.findOne({
			workEmail: data.workEmail,
		});

		if (existingUser) {
			return res.status(400).send({
				error: "workEmail already exists. Please choose a different workEmail.",
			});
		} else {
			const businessdata = await Business.create(data);
			sendMail(req.body.workEmail, req.body.name, "hello");
			console.log(businessdata);
			return res.send({
				message: "Business Registered Successfully",
				success: true,
				businessId: businessdata._id, // assuming _id is the field name for the business ID
			});
		}
	} catch (error) {
		console.error("Error:", error.message); // Log the specific error message
		return res.status(500).send("Internal Server Error");
	}
};

export const getAll = async (req, res) => {
	try {
		const businesses = await Business.find();
		return res.send(businesses);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
};

export const getById = async (req, res) => {
	const Id = req.params.id;

	if (!mongoose.Types.ObjectId.isValid(Id)) {
		return res.status(400).send("Invalid ID");
	}

	try {
		const business = await Business.findById(Id);

		if (!business) {
			return res.status(404).send("Business not found");
		}

		return res.send(business);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
};

export const updateById = async (req, res) => {
	const Id = req.params.id;

	try {
		const existingBusiness = await Business.findById(Id);

		if (!existingBusiness) {
			return res.status(404).send("Business not found");
		}

		existingBusiness.name = req.body.name || existingBusiness.name;
		existingBusiness.contactNumber =
			req.body.contactNumber || existingBusiness.contactNumber;
		existingBusiness.workEmail =
			req.body.workEmail || existingBusiness.workEmail;
		existingBusiness.category = req.body.category || existingBusiness.category;
		existingBusiness.city = req.body.city || existingBusiness.city;
		existingBusiness.mapLink = req.body.mapLink || existingBusiness.mapLink;
		existingBusiness.address = req.body.address || existingBusiness.address;
		existingBusiness.bio = req.body.bio || existingBusiness.bio;
		existingBusiness.profilePicture =
			req.body.profilePicture || existingBusiness.profilePicture;

		const updatedBusiness = await existingBusiness.save();

		return res.send(updatedBusiness);
	} catch (error) {
		console.error(error);
		return res.status(500).send("Internal Server Error");
	}
};

export const deleteById = async (req, res) => {
	const Id = req.params.id;

	try {
		const existingBusiness = await Business.findById(Id);

		if (!existingBusiness) {
			return res.status(404).send("Business not found");
		}

		await Business.deleteOne({ _id: Id });

		return res.send({ message: "Business deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).send("Internal Server Error");
	}
};

export const sendMail = async (to, subject, text) => {
	const transporter = nodemailer.createTransport({
		port: 465,
		service: "gmail",
		auth: {
			user: "fisakhan0347@gmail.com",
			pass: "mnqi jalg hxqf wkix",
		},
		secure: true, // upgrades later with STARTTLS -- change this based on the PORT
	});
	const mailData = {
		from: "fisakhan0347@gmail.com",
		to: to,
		subject: subject,
		text: text,
		html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>",
	};
	console.log(mailData);
	return await transporter.sendMail(mailData, (error, info) => {
		if (error) {
			return console.log(error);
		}
		status(200).send({ message: "Mail send", message_id: info.messageId });
	});
};
