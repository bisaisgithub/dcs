// import { response } from 'express';
import {v4 as uuid} from 'uuid';
import db from "../config/db.js";


export const getAppointmentById = async (req, res)=>{
    let data = {};
    try {
        const resAppointmentById = await db('appointment')
        .where('app_id', req.params.id)
        .first();
        // res.json(resAppointmentById);
        data = await resAppointmentById;
        if (resAppointmentById) {
            const resProceduresById = await db('procedure')
            .where('proc_appointment_id', req.params.id)
            .where('is_deleted', 0)
            .orderBy('created_at');
            if (resProceduresById) {
                data = {...data, resProceduresById}
            }
            const resPaymentsById = await db('payment')
            .where('pay_appointment_id', req.params.id)
            .where('is_deleted', 0)
            .orderBy('created_at');
            // console.log('resPaymentsById: ', resPaymentsById);
            if (resProceduresById) {
                data = {...data, resPaymentsById}
            }
            res.json(data);
        } else {
            res.json({message: 'Appointment Not Found'})
        }
    } catch (error) {
        console.log('error: ', error);
    }
}

export const getAppointments = async (req, res)=>{
    try {

        // const response = await db.raw(
        //     `SELECT b.patient_name, c.user_name 
        //     FROM appointment s
        //         INNER JOIN patient b ON s.app_patient_id = b.patient_id
        //         INNER JOIN user c ON s.app_user_doctor_id  = c.user_id
        //     where s.app_id = '12ac529f-d0ff-42d5-9f43-35597a46ec85'
        //     ORDER BY b.patient_name`
        //     );
     
        const response = await db.from('appointment').select(
            'patient.patient_name', 'user.user_name', 'appointment.app_date',
            'appointment.app_start_time', 'appointment.app_end_time', 'appointment.app_id'
            )
            .innerJoin('user', 'appointment.app_user_doctor_id', 'user.user_id')
            .innerJoin('patient', 'appointment.app_patient_id', 'patient.patient_id')
            .orderBy(['appointment.app_date', { column: 'appointment.app_start_time', order: 'asc' }]);
            // console.log('response', response);
        res.json(response);
    } catch (error) {
        console.log('catch error: ', error)
    }  
};

export const getAppointmentsBySearch = async (req, res)=>{
    // console.log('req.body', req.body)
    try {
        const response = await db.from('appointment').select(
            'patient.patient_name', 'user.user_name', 'appointment.app_date',
            'appointment.app_start_time', 'appointment.app_end_time',
            )
            .innerJoin('user', 'appointment.app_user_doctor_id', 'user.user_id')
            .innerJoin('patient', 'appointment.app_patient_id', 'patient.patient_id')
            .where('user.user_name', 'like', `%${req.body.app_search_user_doctor_name}%`)
            .where('patient.patient_name', 'like', `%${req.body.app_search_patient_name}%`)
            .where('appointment.app_date', 'like', `%${
                // new Date(req.body.app_search_date).toISOString().split('T')[0]
                req.body.app_search_date === ''? '' : req.body.app_search_date
            }%`)
            .orderBy(['appointment.app_date', { column: 'appointment.app_start_time', order: 'asc' }]);
            // console.log('response', response);
            console.log('date: ',req.body.app_search_date)
        res.json(response);
    } catch (error) {
        console.log('catch error: ', error)
    }  
};

export const createAppointment = async (req, res)=>{
    // console.log('req.body.app_pay_fields: ', req.body)
    const appointmentId = uuid();
    try {
        const response = await db('appointment').insert({
            app_id: appointmentId,
            app_patient_id: req.body.app_patient_id,
            app_user_doctor_id: req.body.app_user_doctor_id,
            app_date: new Date(req.body.app_date).toMysqlFormat(),
            app_start_time: new Date(req.body.app_start_time).toMysqlFormat(),
            app_end_time: new Date(req.body.app_end_time).toMysqlFormat(),
            app_status: req.body.app_status,
            app_type: req.body.app_type,
        });
        if (response) {
            let procedures = [];
            req.body.app_proc_fields.map((procedure)=>{
                procedures = [...procedures, 
                    {
                        proc_id: uuid(),
                        proc_appointment_id: appointmentId,
                        proc_name: procedure.proc_name,
                        proc_duration_minutes: procedure.proc_duration_minutes,
                        proc_cost: procedure.proc_cost,
                        is_deleted: false
                    }
                ]                
            });
            const responseProcedures = await db('procedure').insert(procedures);
            if (responseProcedures) {
                if (req.body.app_pay_fields.length>0) {
                    // if (false) {
                    let payments = [];
                    req.body.app_pay_fields.map((app_pay_field)=>{
                        payments = [...payments,
                            {
                                pay_id: uuid(),
                                pay_appointment_id: appointmentId,
                                pay_amount: app_pay_field.pay_amount,
                                pay_date: new Date(app_pay_field.pay_date).toMysqlFormat(),
                                pay_change: app_pay_field.pay_change,
                                pay_balance: app_pay_field.pay_balance,
                                is_deleted: false
                            }
                        ]                
                    });
                    const responsePayment = await db('payment').insert(payments);
                    if (responsePayment) {
                        console.log('responsePayment: ', responsePayment)
                        const userUpdateResponse = await db('patient').where('patient_id', req.body.app_patient_id).update({
                            patient_status: 'Scheduled',
                        });
                        console.log('userUpdateResponse: ', userUpdateResponse)
                        if (userUpdateResponse) {
                            res.json({appointmentInsertOk: true});
                        } else {
                            res.json({appointmentInsertOk: false});
                        }  
                    } else {
                        res.json({appointmentInsertOk: false});
                    }
                } else {
                    console.log('pay_amount is false')
                   try {
                        const userUpdateResponse = await db('patient').where('patient_id', req.body.app_patient_id).update({
                            patient_status: 'Scheduled',
                        });
                        console.log('userUpdateResponse: ', userUpdateResponse)
                        if (userUpdateResponse) {
                            res.json({appointmentInsertOk: true});
                        } else {
                            res.json({appointmentInsertOk: false});
                        }  
                   } catch (error) {
                       console.log('error catched: ', error);
                       res.json({appointmentInsertOk: false});
                   }
                      
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

export const updateAppointment = async (req, res)=>{
    try {
        const appointmentUpdateResponse = await db('appointment').where('app_id', req.params.id)
        .update({
            app_patient_id: req.body.app_patient_id,
            app_user_doctor_id: req.body.app_user_doctor_id,
            app_date: new Date(req.body.app_date).toMysqlFormat(),
            app_start_time: new Date(req.body.app_start_time).toMysqlFormat(),
            app_end_time: new Date(req.body.app_end_time).toMysqlFormat(),
            app_status: req.body.app_status,
            app_type: req.body.app_type
        });
    if (appointmentUpdateResponse) {
        if (req.body.app_proc_fields.length>0) {
            let addProcedure = [];
            let updateProcedure = [];
            req.body.app_proc_fields.map((field)=>{
                if (!field.proc_id) {
                    field.proc_id = uuid();
                    field.proc_appointment_id = req.params.id;
                    addProcedure = [...addProcedure, field];
                }else{
                    updateProcedure = [...updateProcedure, field]
                }
            });
            if (updateProcedure.length>0) {
                updateProcedure.map(async (field)=>{
                    let field2 = {...field};
                    delete field2.proc_id;
                    delete field2.created_at;
                    delete field2.updated_at;
                    delete field2. proc_appointment_id;
                    const updateProcedureResponse = await db('procedure')
                        .where('proc_id', field.proc_id)
                        .update(field2);
                    if (!updateProcedureResponse) {
                        res.json({appointmentUpdateOk: false});
                        return false;
                    }
                });
            }
            if (addProcedure.length>0) {
                const addProcedureResponse = await db('procedure').insert(addProcedure);
                if (!addProcedureResponse) {
                    res.json({appointmentUpdateOk: false});
                    return false;
            }
            }
            if (req.body.app_proc_fields_delete.length>0) {
                req.body.app_proc_fields_delete.map( async (field)=>{
                    let field2 = {is_deleted: true}
                    const deleteProcResponse = await db('procedure')
                        .where('proc_id', field)
                        .update(field2);
                    if (!deleteProcResponse) {
                        res.json({appointmentUpdateOk: false});
                        return false;
                    }
                });
            }
            let addPayment = [];
            let updatePayment = [];
            req.body.app_pay_fields.map((field)=>{
                if (!field.pay_id) {
                    field.pay_id = uuid();
                    field.pay_appointment_id = req.params.id;
                    field.pay_date = new Date(field.pay_date).toMysqlFormat();
                    addPayment = [...addPayment, field];
                } else {
                    updatePayment = [...updatePayment, field];
                }
            });
            if (updatePayment.length>0) {
                updatePayment.map(async (field)=>{
                    let field2 = {...field};
                    delete field2.pay_id;
                    delete field2.created_at;
                    delete field2.updated_at;
                    delete field2.app_appointment_id;
                    field2.pay_date = new Date(field2.pay_date).toMysqlFormat();
                    console.log('updatePayment field2: ', field2);
                    const updatePaymentResponse = await db('payment')
                        .where('pay_id', field.pay_id)
                        .update(field2);
                    if (!updatePaymentResponse) {
                        res.json({appointmentUpdateOk: false});
                        return false;
                    }
                });
            }
            if (addPayment.length>0) {
                // console.log('addPayment: ', addPayment);
                const addPaymentReponse = await db('payment').insert(addPayment);
                if (!addPaymentReponse) {
                    res.json({appointmentUpdateOk: false});
                    return false;
                }
            }
            if (req.body.app_pay_fields_delete.length>0) {
                req.body.app_pay_fields_delete.map(async (field)=>{
                    let field2 = {is_deleted: true}
                    const deletePayResponse = await db('payment')
                        .where('pay_id', field)
                        .update(field2);
                    if (!deletePayResponse) {
                        res.json({appointmentUpdateOk: false});
                        return false;
                    }
                })
            }
            // console.log('addProcedure: ', addProcedure);
            // console.log('updateProcedure: ', updateProcedure);
            res.json({appointmentUpdateOk: true});
        }else{
            res.json({appointmentUpdateOk: false});
        }
    } else {
        res.json({appointmentUpdateOk: false});
    }
    } catch (error) {
        res.json({appointmentUpdateOk: false});
        console.log('update appointment error: ', error);
    }
}

export const saveExam = async (req, res)=>{
    try {
        const saveExamResponse = await db('exam').insert({
            exam_id: uuid(),
            exam_appointment_id: req.body.app_id,
            exam_remark: JSON.stringify(req.body.tooth_remark),
            exam_check_box: JSON.stringify(req.body.tooth_check_box)
        });
        if (saveExamResponse) {
            res.json({examInsertOk: true});
        } else {
            res.json({examInsertOk: false});
        }
    } catch (error) {
        console.log('save exam error: ', error)
    }
}

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