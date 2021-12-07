import { Router } from "express";
import { createUser, deleteUser, getUserByID, getUsers, loginUser, refreshToken, updateUser } from "../controller/user.controller.js";


const userRouter = Router();

userRouter.get('/users', getUsers);

userRouter.post('/user', createUser);

userRouter.get('/user/:id', getUserByID);

userRouter.delete('/user/:id', deleteUser);

userRouter.put('/user/:id', updateUser);

userRouter.post('/login', loginUser);

userRouter.get('/refresh_token', refreshToken);

export default userRouter;