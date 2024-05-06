import express from "express";
import {
	addServices,
	getAll,
	getById,
	updateById,
	deleteById,
} from "../controllers/services.js";

const servicesRouter = express.Router();

servicesRouter.post("/add", addServices);
servicesRouter.get("/all", getAll);
servicesRouter.get("/:id", getById);
servicesRouter.put("/:id", updateById);
servicesRouter.delete("/:id", deleteById);

// Login user
//router.post("/services",businessServices);

export default servicesRouter;
