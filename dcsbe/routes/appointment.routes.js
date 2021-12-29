import { Router } from "express";
import { createAppointment, getAppointmentById, getAppointments, getAppointmentsBySearch } from "../controller/appointment.controller.js";



const appointmentRouter = Router();

appointmentRouter.get('/appointments', getAppointments);

appointmentRouter.get('/appointment/:id', getAppointmentById);

appointmentRouter.post('/appointments', getAppointmentsBySearch);

// appointmentRouter.get('/users/:search', getUsersBySearch);

appointmentRouter.post('/appointment', createAppointment);

// appointmentRouter.post('/users', getUsersBySearch2);

// appointmentRouter.get('/user/:id', getUserByID);

// appointmentRouter.delete('/user/:id', deleteUser);

// appointmentRouter.put('/user/:id', updateUser);

// appointmentRouter.post('/login', loginUser);

// appointmentRouter.get('/refresh_token', refreshToken);

export default appointmentRouter;