// import { response } from 'express';
import {v4 as uuid} from 'uuid';
import db from "../config/db.js";


export const getAppointments = async (req, res)=>{
    try {

        const response = await db.raw('select * from user s, appointment b, patient c where b.doctor_id = s.id and b.patient_id = c.id ');
        // const response = await db('appointment')
        // .join('patient', 'appointment.patient_id', '=', 'patient.id')
        // .join('user', 'appointment.doctor_id', '=', 'user.id')
        // .select('appointment.id', 'patient.name', 'user.name')
        // .orderBy('date', 'desc');
        // console.log('response patients: ', response);
        res.json(response);
    } catch (error) {
        console.log('catch error: ', error)
    }  
};

export const createAppointment = async (req, res)=>{
    // console.log('appointment reqbody: ',req.body.procedure)
    // console.log('procedure', req.body.procedure[0].procedure)
    

    
    const appointmentId = uuid();
    try {
        const response = await db('appointment').insert({
            app_id: appointmentId,
            app_patient_id: req.body.app_patient_id,
            app_user_doctor_id: req.body.app_user_doctor_id,
            app_date: new Date(req.body.app_date).toISOString().split('T')[0],
            app_start_time: new Date(req.body.app_start_time).toISOString().split('T')[0] + ' '+ new Date(req.body.app_start_time).toTimeString().split(' ')[0],
            app_end_time: new Date(req.body.app_end_time).toISOString().split('T')[0] + ' '+ new Date(req.body.app_end_time).toTimeString().split(' ')[0],
            app_status: req.body.app_status,
            app_type: req.body.app_type,
        });
        // console.log(response);
        if (response) {
            let procedures = [];
            req.body.procedures.map((procedure)=>{
                procedures = [...procedures, 
                    {
                        proc_id: uuid(),
                        proc_patient_id: req.body.proc_patient_id,
                        proc_user_doctor_id: req.body.proc_user_doctor_id,
                        proc_appointment_id: appointmentId,
                        proc_name: procedure.proc_name,
                        proc_duration_minutes: procedure.proc_duration_minutes,
                        proc_cost: procedure.proc_cost,
                    }
                ]                
            });
            const responseProcedures = await db('procedure').insert(procedures);
            if (responseProcedures) {
                let payments = [];
                req.body.payments.map((payment)=>{
                    payments = [...payments, 
                    {
                        pay_id: uuid(),
                        pay_appointment_id: appointmentId,
                        pay_patient_id: req.body.pay_patient_id,
                        pay_amount: payment.pay_amount,
                        pay_date: new Date(req.body.pay_date).toISOString().split('T')[0] + ' '+ new Date(req.body.pay_date).toTimeString().split(' ')[0],
                        pay_change: payment.pay_change,
                        pay_balance: payment.pay_balance,
                    }
                ]                
            });
                const responsePayment = await db('payment').insert(payments);
                if (responsePayment) {
                    res.json({appointmentInsertOk: true});
                } else {
                    res.json({appointmentInsertOk: false});
                }
                
            } else {
                res.json({appointmentInsertOk: false});
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