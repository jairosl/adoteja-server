import { Router } from 'express';
import multer from 'multer';
import PetsController from '../app/controllers/petsController';
import authenticateJWT from '../app/middlewares/authenticateJWT';
import config from '../config/multer';

const upload = multer(config);

const petsRoutes = Router();

const petsController = new PetsController();

petsRoutes.use(authenticateJWT);

petsRoutes.post('/', upload.single('image'), petsController.create);

export default petsRoutes;
