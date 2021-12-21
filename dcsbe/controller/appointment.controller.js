// import { response } from 'express';
import {v4 as uuid} from 'uuid';
import db from "../config/db.js";


// export const getPatients = async (req, res)=>{
//     try {
//         // console.log('getPatients called');
//         const response = await db('patient').orderBy('name', 'desc');
//         // console.log('response patients: ', response);
//         res.json(response);
//     } catch (error) {
//         console.log('catch error: ', error)
//     }  
// };

export const createAppointment = async (req, res)=>{
    // console.log('appointment reqbody: ',req.body.procedure)
    // console.log('procedure', req.body.procedure[0].procedure)
    

    
    const appointmentId = uuid();
    try {
        const response = await db('appointment').insert({
            id: appointmentId,
            patient_id: req.body.patient_id,
            doctor_id: req.body.doctor_id,
            date: req.body.date,
            start_time: new Date(req.body.start_time).toISOString().split('T')[0] + ' '+ new Date(req.body.start_time).toTimeString().split(' ')[0],
            end_time: new Date(req.body.end_time).toISOString().split('T')[0] + ' '+ new Date(req.body.end_time).toTimeString().split(' ')[0],
            status_: req.body.status_,
            type: req.body.type,
        });
        console.log(response);
        if (response) {
            let procedures = [];
            req.body.procedures.map((procedure)=>{
                procedures = [...procedures, 
                    {
                        id: uuid(),
                        patient_id: req.body.patient_id,
                        doctor_id: req.body.doctor_id,
                        appointment_id: appointmentId,
                        procedure_name: procedure.procedure,
                        duration_minutes: procedure.durationMinutes,
                        procedure_cost: procedure.cost,
                    }
                ]                
            });
            const responseProcedures = await db('procedure').insert(procedures);
            if (responseProcedures) {
                res.json({appointmentInsertOk: true});
            } else {
                
            }
            
        } else {
            res.json({appointmentInsertOk: false});
        }
        
    } catch (error) {
        console.log('error: ', error);
        res.json({appointmentInsertOk: false});
    }
    
};

// export const getPatientByID = async (req, res)=>{
//     // const singleUser = users.filter((user)=>user.id === req.params.id);
//     const singlePatientReponse = await db('patient').where('id', req.params.id)
//     res.send(singlePatientReponse);
// }

// export const getPatientBySearch = async (req, res)=>{
//     // const singleUser = users.filter((user)=>user.id === req.params.id);
//     const singlePatientReponse = await db('patient').where('name', 'like', `%${req.params.search}%`)
//     .orWhere('status_', 'like', `%${req.params.search}%`);
//     res.send(singlePatientReponse);
// }

// export const getPatientsBySearch2 = async (req, res)=>{
//     // const singleUser = users.filter((user)=>user.id === req.params.id);
//     const singlePatientReponse = await db('patient').where('name', 'like', `%${req.body.name}%`)
//     .where('status_', 'like', `%${req.body.status_}%`).orderBy('name', 'asc');
//     // console.log('req.body', req.body)
//     res.send(singlePatientReponse);
// }

// export const deleteUser = async (req, res)=>{
//     // users = users.filter((user)=>user.id !== req.params.id);
//     try {
//         const deleteUserResponse = await db('users').where('id', req.params.id).del();
//          res.send('user deleted');
//     } catch (error) {
//         console.log('error deleting: ', error);
//     }
    
// }

// export const updatePatient = async (req, res)=>{
//     // res.json({nameSendingIs: req.body.name })

//     try {
//         const userUpdateResponse = await db('patient').where('id', req.params.id).update({
//             name: req.body.name,
//             mobile: req.body.mobile,
//             gender: req.body.gender,
//             dob: req.body.dob,
//             allergen: req.body.allergen,
//             status_: req.body.status_,
//         });
//         if (userUpdateResponse) {
//             res.json({updateOk: true});
//         } else {
//             console.log('upating to the database returned 0 or false');
//             res.json({updateOk: false});
//         }
    
//         // console.log(user);
//         // user.name = req.body.name;
//         // user.contact = req.body.contact;
//         // user.email = req.body.email;
    
//         // res.json({updateOk: true});
//         // res.json(userUpdateResponse)
//     } catch (error) {
//         console.log('updatePatient trycatch reponse error: ', error)
//         res.json({updateOk: false});
//     }

    
// }

// export const refreshToken = async (req, res)=>{
//     const token = req.cookies.jid;
//     console.log(token);
//     if (!token) {
//         return res.json({ok: false, accessToken: ''});
//     }
//     const payload = null;
//     try {
//         payload = jwt.verify(token, 'secretRefresh')
//     } catch (error) {
//         res.clearCookie("jid");
//         console.log('catch error: ',error);
//         return res.json({ok: false, accessToken: ''});
       
//     }

//     const user = await db('users').where('id', payload.userId);
//     if (!user) {
//         return res.json({ok: false, accessToken: ''});
//     }

//     return res.json({ok: true, accessToken: jwt.sign({userId: checkEmail.id},
//         "secretAccess", {expiresIn: "2min"}
//     )})
// }