import { Router } from "express";
import { createPatient, getPatients } from "../controller/patient.controller.js";

const patientRouter = Router();

patientRouter.get('/patient', getPatients);

patientRouter.post('/patient', createPatient);

// userRouter.get('/user/:id', getUserByID);

// userRouter.delete('/user/:id', deleteUser);

// userRouter.put('/user/:id', updateUser);

// userRouter.post('/login', loginUser);

// userRouter.get('/refresh_token', refreshToken);

export default patientRouter;