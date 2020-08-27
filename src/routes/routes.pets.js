import { Router } from 'express';
import multer from 'multer';
import PetsController from '../app/controllers/petsController';
import authenticateJWT from '../app/middlewares/authenticateJWT';
import config from '../config/multer';

const upload = multer(config);

const petsRoutes = Router();

const petsController = new PetsController();

petsRoutes.get('/', petsController.showAllbyLocationAndQueryParams);

petsRoutes.use(authenticateJWT);

petsRoutes.get('/user', petsController.show);
petsRoutes.get('/:uuid_pet', petsController.index);

petsRoutes.post('/', upload.single('image'), petsController.create);
petsRoutes.put('/:uuid_pet', upload.single('image'), petsController.update);
petsRoutes.delete('/:uuid_pet', petsController.delete);

export default petsRoutes;
