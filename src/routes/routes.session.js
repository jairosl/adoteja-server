import { Router } from 'express';
import SessionControler from '../app/controllers/sessionController';

const sessionRoute = Router();

const sessionControler = new SessionControler();

sessionRoute.post('/', sessionControler.create);

export default sessionRoute;
