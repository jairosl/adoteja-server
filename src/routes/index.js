import { Router } from 'express';

import userRoute from './routes.users';

const routes = Router();

routes.use('/users', userRoute);

export default routes;
