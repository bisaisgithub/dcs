import {verify} from 'jsonwebtoken';



export const isAuth = (req, res, next) => {
    const authorization = req.headers['authorization'];

    if (!authorization) {
        res.json({message: 'Not Authenticated'})
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = verify(token, 'secretAccess')
    } catch (error) {
        console.log(error);
    }
    
    console.log('payload ', payload);
    return next();
}