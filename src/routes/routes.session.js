import { Router } from 'express';
import SessionControler from '../app/controllers/sessionController';

const sessionRoute = Router();

const sessionControler = new SessionControler();

sessionRoute.post('/', sessionControler.create);
sessionRoute.post('/refresh-token', sessionControler.refreshToken);

export default sessionRoute;
