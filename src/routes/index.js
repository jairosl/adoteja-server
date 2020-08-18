import { Router } from 'express';

const routes = Router();

routes.use('/', (req, res) => {
  res.json({ ok: true });
});

export default routes;
