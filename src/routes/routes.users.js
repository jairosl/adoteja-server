import { Router } from 'express';
import UserController from '../app/controllers/userController';

const userRoute = Router();

const userController = new UserController();

userRoute.get('/', userController.index);

export default userRoute;
