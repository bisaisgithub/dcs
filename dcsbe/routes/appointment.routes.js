import { Router } from "express";
import { createAppointment } from "../controller/appointment.controller.js";



const appointmentRouter = Router();

// appointmentRouter.get('/users', getUsers);

// appointmentRouter.get('/users/:search', getUsersBySearch);

appointmentRouter.post('/appointment', createAppointment);

// appointmentRouter.post('/users', getUsersBySearch2);

// appointmentRouter.get('/user/:id', getUserByID);

// appointmentRouter.delete('/user/:id', deleteUser);

// appointmentRouter.put('/user/:id', updateUser);

// appointmentRouter.post('/login', loginUser);

// appointmentRouter.get('/refresh_token', refreshToken);

export default appointmentRouter;