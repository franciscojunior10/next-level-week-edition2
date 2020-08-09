import { Router } from 'express';

import connectionsRouter from './connections.routes';
import classesRouter from './classes.routes';

const routes = Router();

routes.use('/classes', classesRouter);
routes.use('/connections', connectionsRouter);

export default routes;
