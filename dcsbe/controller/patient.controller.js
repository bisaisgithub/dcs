import {v4 as uuid} from 'uuid';
import db from "../config/db.js";



export const getPatients = async (req, res)=>{
    try {
        // console.log('getPatients called');
        const response = await db('patient').orderBy('name', 'desc');
        // console.log('response patients: ', response);
        res.json(response);
    } catch (error) {
        console.log('catch error: ', error)
    }
    
};

export const createPatient = async (req, res)=>{
    // const user = req.body;
    // users.push({...user, id: uuid()});

    try {
        const response = await db('patient').insert({
            id: uuid(),
            name: req.body.name,
            mobile: req.body.mobile,
            gender: req.body.gender,
            dob: req.body.dob,
            allergen: req.body.allergen,
            status_: req.body.status_,
        });
        // console.log('insert succes: ', response);
        res.json({insertOk: true});
    } catch (error) {
        console.log('error: ', error);
        res.json({insertOk: false});
    }
    
};

export const getPatientByID = async (req, res)=>{
    // const singleUser = users.filter((user)=>user.id === req.params.id);
    const singlePatientReponse = await db('patient').where('id', req.params.id)
    res.send(singlePatientReponse);
}

export const getPatientBySearch = async (req, res)=>{
    // const singleUser = users.filter((user)=>user.id === req.params.id);
    const singlePatientReponse = await db('patient').where('name', 'like', `%${req.params.search}%`)
    res.send(singlePatientReponse);
}

export const deleteUser = async (req, res)=>{
    // users = users.filter((user)=>user.id !== req.params.id);
    try {
        const deleteUserResponse = await db('users').where('id', req.params.id).del();
         res.send('user deleted');
    } catch (error) {
        console.log('error deleting: ', error);
    }
    
}

export const updatePatient = async (req, res)=>{
    // res.json({nameSendingIs: req.body.name })

    try {
        const userUpdateResponse = await db('patient').where('id', req.params.id).update({
            name: req.body.name,
            mobile: req.body.mobile,
            gender: req.body.gender,
            dob: req.body.dob,
            allergen: req.body.allergen,
            status_: req.body.status_,
        });
        if (userUpdateResponse) {
            res.json({updateOk: true});
        } else {
            console.log('upating to the database returned 0 or false');
            res.json({updateOk: false});
        }
    
        // console.log(user);
        // user.name = req.body.name;
        // user.contact = req.body.contact;
        // user.email = req.body.email;
    
        // res.json({updateOk: true});
        // res.json(userUpdateResponse)
    } catch (error) {
        console.log('updatePatient trycatch reponse error: ', error)
        res.json({updateOk: false});
    }

    
}

export const refreshToken = async (req, res)=>{
    const token = req.cookies.jid;
    console.log(token);
    if (!token) {
        return res.json({ok: false, accessToken: ''});
    }
    const payload = null;
    try {
        payload = jwt.verify(token, 'secretRefresh')
    } catch (error) {
        res.clearCookie("jid");
        console.log('catch error: ',error);
        return res.json({ok: false, accessToken: ''});
       
    }

    const user = await db('users').where('id', payload.userId);
    if (!user) {
        return res.json({ok: false, accessToken: ''});
    }

    return res.json({ok: true, accessToken: jwt.sign({userId: checkEmail.id},
        "secretAccess", {expiresIn: "2min"}
    )})
}