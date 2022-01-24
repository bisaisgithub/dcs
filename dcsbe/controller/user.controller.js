import {v4 as uuid} from 'uuid';
import db from "../config/db.js"
import {hash, compare} from 'bcrypt';
import jwt from 'jsonwebtoken';


export const getUserDoctorList = async (req, res)=>{
    try {
        const response = await db('user')
        .select('user_id', 'user_name')
        .where('user_type', 'Dentist')
        .orWhere('user_type', 'Surgeon');
        res.json(response);
    } catch (error) {
        console.log('catch error: ', error)
    }
};

export const getUsersBySearch2 = async (req, res)=>{
    try {
    const singlePatientReponse = await db('user').where('user_name', 'like', `%${req.body.user_name}%`)
    .where('user_type', 'like', `%${req.body.user_type}%`).orderBy([{ column: 'user_name' }, { column: 'user_type', order: 'asc' }]);
    res.send(singlePatientReponse); 
    } catch (error) {
        console.log('error getUsersBySearch2', error);
    }
    
}

export const getUsers = async (req, res)=>{
    const response = await db('user').orderBy([{ column: 'user_name' }, { column: 'user_type', order: 'asc' }]);
    res.json(response);
};

export const createUser = async (req, res)=>{
    const hashedPassword = await hash(req.body.user_password, 10);
    try {
        const response = await db('user').insert({
            user_id: uuid(),
            user_name: req.body.user_name,
            user_mobile: req.body.user_mobile,
            user_gender: req.body.user_gender,
            user_dob: req.body.user_dob,
            user_email: req.body.user_email,
            user_type: req.body.user_type,
            user_password: hashedPassword,
            user_status: req.body.user_status,
        });
        if (response) {
            res.json({userInsertOk: true});
        } else {
            res.json({userInsertOk: false});
        }
        
    } catch (error) {
        res.json({userInsertOk: false});
        console.log('error: ', error);
    }
    
};

export const getUserByID = async (req, res)=>{
    const singleUserReponse = await db('user').where('user_id', req.params.id)
    res.send(singleUserReponse);
}

export const updateUser = async (req, res)=>{
    const userUpdateResponse = await db('user').where('user_id', req.params.id).update({
        user_name: req.body.user_name,
        user_mobile: req.body.user_mobile,
        user_gender: req.body.user_gender,
        user_dob: req.body.user_dob,
        user_email: req.body.user_email,
        user_type: req.body.user_type,
        user_status: req.body.user_status,
    });
    if (userUpdateResponse) {
        res.json({userUpdateOk: true});
    } else {
        res.json({userUpdateOk: false});
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
