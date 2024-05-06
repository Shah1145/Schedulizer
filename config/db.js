import mongoose from "mongoose";

async function db(url) {
	try {
		await mongoose.connect(url);
		console.log("Database Connected Successfully");
	} catch (error) {
		console.log("Database cannot be Connected");
	}
}

export default db;
