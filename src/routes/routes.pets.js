import { Router } from 'express';
import multer from 'multer';
import PetsController from '../app/controllers/petsController';
import authenticateJWT from '../app/middlewares/authenticateJWT';
import validationPets, {
  validationPetsQuery,
} from '../app/middlewares/validationPets';
import config from '../config/multer';

const upload = multer(config);

const petsRoutes = Router();

const petsController = new PetsController();

petsRoutes.get(
  '/',
  validationPetsQuery,
  petsController.showAllbyLocationAndQueryParams
);

petsRoutes.use(authenticateJWT);

petsRoutes.get('/user', validationPetsQuery, petsController.show);
petsRoutes.get('/:uuid_pet', petsController.index);

petsRoutes.post(
  '/',
  upload.single('image'),
  validationPets,
  petsController.create
);
petsRoutes.put(
  '/:uuid_pet',
  upload.single('image'),
  validationPets,
  petsController.update
);
petsRoutes.delete('/:uuid_pet', petsController.delete);

export default petsRoutes;
