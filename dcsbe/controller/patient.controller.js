import {v4 as uuid} from 'uuid';
import db from "../config/db.js";



export const getPatients = async (req, res)=>{
    try {
        // console.log('getPatients called');
        const response = await db('patient').orderBy('patient_name', 'desc');
        // console.log('response patients: ', response);
        res.json(response);
    } catch (error) {
        console.log('catch error: ', error)
    }
};

export const getPatientList = async (req, res)=>{
    try {
        const response = await db('patient')
        .select('patient_id', 'patient_name');
        res.json(response);
    } catch (error) {
        console.log('catch error: ', error)
    }
};

export const createPatient = async (req, res)=>{
    try {
        const response = await db('patient').insert({
            patient_id: uuid(),
            patient_name: req.body.patient_name,
            patient_mobile: req.body.patient_mobile,
            patient_gender: req.body.patient_gender,
            patient_dob: new Date(req.body.patient_dob).toISOString().split('T')[0],
            patient_allergen: req.body.patient_allergen,
            patient_status: req.body.patient_status,
        });
        res.json({insertOk: true});
    } catch (error) {
        console.log('error: ', error);
        res.json({insertOk: false});
    }
    
};

export const getPatientByID = async (req, res)=>{
    const singlePatientReponse = await db('patient').where('patient_id', req.params.id)
    res.send(singlePatientReponse);
}

export const getPatientsBySearch2 = async (req, res)=>{
    const singlePatientReponse = await db('patient').where('patient_name', 'like', `%${req.body.name}%`)
    .where('patient_status', 'like', `%${req.body.status_}%`).orderBy('patient_name', 'asc');
    res.send(singlePatientReponse);
}

export const updatePatient = async (req, res)=>{
    try {
        const userUpdateResponse = await db('patient').where('patient_id', req.params.id).update({
            patient_name: req.body.patient_name,
            patient_mobile: req.body.patient_mobile,
            patient_gender: req.body.patient_gender,
            patient_dob: req.body.patient_dob,
            patient_allergen: req.body.patient_allergen,
            patient_status: req.body.patient_status,
        });
        if (userUpdateResponse) {
            res.json({updateOk: true});
        } else {
            console.log('upating to the database returned 0 or false');
            res.json({updateOk: false});
        }
    
    } catch (error) {
        console.log('updatePatient trycatch reponse error: ', error)
        res.json({updateOk: false});
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