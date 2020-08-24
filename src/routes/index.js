import { Router } from 'express';
import sessionRoute from './routes.session';

import userRoute from './routes.users';
import petsRoutes from './routes.pets';

const routes = Router();

routes.use('/users', userRoute);
routes.use('/session', sessionRoute);
routes.use('/pets', petsRoutes);

export default routes;
