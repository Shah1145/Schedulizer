import express from "express";
import multer from "multer";
import path from "path";
import {
	registeredBusiness,
	getAll,
	getById,
	updateById,
	deleteById,
	//uploadPic,
} from "../controllers/businesses.js";

const businessRouter = express.Router();

const storage = multer.diskStorage({
	destination: "./public/userProfileImages/",
	filename: (req, file, callback) => {
		return callback(
			null,
			`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
		);
	},
});
const upload = multer({ storage: storage });

// eslint-disable-next-line no-unused-vars
// businessRouter.post(
// 	"/profile/:id",
// 	upload.single("businessProfile"),
// 	async (req, res) => {
// 		const Id = req.params.id;

// 		try {
// 			const existingBusiness = await Business.findById(Id);

// 			if (!existingBusiness) {
// 				return res.status(404).send("Business not found");
// 			}

// 			existingBusiness.businessProfile = req.file.filename;
// 			existingBusiness.businessBio =
// 				req.body.businessBio || existingBusiness.businessBio;

// 			const updatedBusiness = await existingBusiness.save();

// 			console.log(updatedBusiness);
// 			return res.json(updatedBusiness);
// 		} catch (error) {
// 			console.error(error);
// 			return res.status(500).send("Internal Server Error1");
// 		}
// 	}
// );

businessRouter.post(
	"/registered",
	upload.single("businessProfilePicture"),
	registeredBusiness
);

businessRouter.get("/all", getAll);
businessRouter.get("/:id", getById);
businessRouter.put("/:id", updateById);
businessRouter.delete("/:id", deleteById);

export default businessRouter;
