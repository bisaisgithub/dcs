import { Router } from "express";
import { createPatient, getPatients,
     getPatientByID, 
     updatePatient, 
    //  getPatientBySearch, 
     getPatientsBySearch2, 
     getPatientList} from "../controller/patient.controller.js";

const patientRouter = Router();

patientRouter.get('/patients', getPatients);

patientRouter.get('/patient-list', getPatientList);

patientRouter.post('/patients', getPatientsBySearch2);

patientRouter.post('/patient', createPatient);

patientRouter.get('/patient/:id', getPatientByID);

// patientRouter.get('/patients/:search', getPatientBySearch);

// userRouter.delete('/user/:id', deleteUser);

patientRouter.put('/patient/:id', updatePatient);

// userRouter.post('/login', loginUser);

// userRouter.get('/refresh_token', refreshToken);

export default patientRouter;