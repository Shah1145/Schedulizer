import express from "express";
import {
	addAppointment,
	getAll,
	getById,
	updateById,
	deleteById,
} from "../controllers/appointments.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/create", addAppointment);
appointmentRouter.get("/all", getAll);
appointmentRouter.get("/:id", getById);
appointmentRouter.put("/:id", updateById);
appointmentRouter.delete("/:id", deleteById);

export default appointmentRouter;
