import { Router } from 'express';
import UserController from '../app/controllers/userController';
import authenticateJWT from '../app/middlewares/authenticateJWT';
import validationUser from '../app/middlewares/validationUser';

const userRoute = Router();

const userController = new UserController();

// userRoute.get('/', userController.index);
userRoute.post('/', validationUser, userController.create);
userRoute.use(authenticateJWT);
userRoute.put('/', validationUser, userController.update);
userRoute.delete('/', userController.delete);

export default userRoute;
