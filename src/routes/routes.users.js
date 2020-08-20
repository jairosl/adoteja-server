import { Router } from 'express';
import UserController from '../app/controllers/userController';

const userRoute = Router();

const userController = new UserController();

userRoute.get('/', userController.index);
userRoute.post('/', userController.create);
userRoute.put('/:id_user', userController.update);
userRoute.delete('/:id_user', userController.delete);

export default userRoute;
