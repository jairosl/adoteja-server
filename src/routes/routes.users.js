import { Router } from 'express';
import UserController from '../app/controllers/userController';
import validationUser from '../app/middlewares/validationUser';

const userRoute = Router();

const userController = new UserController();

userRoute.get('/', userController.index);
userRoute.post('/', validationUser, userController.create);
userRoute.put('/:id_user', validationUser, userController.update);
userRoute.delete('/:id_user', userController.delete);

export default userRoute;
