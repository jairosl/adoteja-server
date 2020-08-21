import { Router } from 'express';
import sessionRoute from './routes.session';

import userRoute from './routes.users';

const routes = Router();

routes.use('/users', userRoute);
routes.use('/session', sessionRoute);

export default routes;
