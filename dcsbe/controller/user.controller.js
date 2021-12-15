import {v4 as uuid} from 'uuid';
import db from "../config/db.js"
import {hash, compare} from 'bcrypt';
import jwt from 'jsonwebtoken';

let users = [];

export const loginUser = async (req, res)=>{
    console.log('loginUser runs')
    const checkEmail = await db('users').where('email', req.body.email).first();
    console.log(req.body.email);
    if (!checkEmail) {
        console.log('empty checkEmail: ', checkEmail);
    }else{
        // console.log('checkemail not empty', checkEmail)
        try {
            const checkPassword = await compare(req.body.password, checkEmail.name);
            if (!checkPassword) {
                console.log('password not correct', checkPassword);
            }else{
                console.log('login success');
                // res.cookie("jid", "test");
                res.cookie(
                    "jid", 
                    jwt.sign({userId: checkEmail.id},
                        "secretRefresh", {expiresIn: "2min"}), 
                    {
                        httpOnly: true,
                        
                    }
                );

                return res.json({
                    accessToken: jwt.sign({userId: checkEmail.id},
                        "secretAccess", {expiresIn: "2min"}
                    ),
                 });
             }
        } catch (error) {
            console.log('check pass error', error);
        }
        
    }
}

export const getUsers = async (req, res)=>{
    
    const response = await db('users').orderBy('created_at', 'desc');
    // console.log('response gerusers: ', response);
    
    // res.send(response);

    res.json(response);
};

export const createUser = async (req, res)=>{
    // const user = req.body;
    // users.push({...user, id: uuid()});
    const hashedPassword = await hash(req.body.password, 10);
    try {
        const response = await db('user').insert({
            id: uuid(),
            name: req.body.name,
            mobile: req.body.mobile,
            gender: req.body.gender,
            dob: req.body.dob,
            email: req.body.email,
            type: req.body.type,
            password: hashedPassword,
        });
        // console.log('insert succes: ', response);
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
    // const singleUser = users.filter((user)=>user.id === req.params.id);
    const singleUserReponse = await db('users').where('id', req.params.id)
    res.send(singleUserReponse);
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

export const updateUser = async (req, res)=>{
    // const user = users.find((user)=>user.id === req.params.id);

    const userUpdateResponse = await db('users').where('id', req.params.id).update({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
    });

    // console.log(user);
    // user.name = req.body.name;
    // user.contact = req.body.contact;
    // user.email = req.body.email;

    res.send('User Updated');
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