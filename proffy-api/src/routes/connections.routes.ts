import { Router } from 'express';
import ConnectionsController from '../controllers/ConnectionsController';

const connectionsRouter = Router();
const ConnectionsControllers = new ConnectionsController();

connectionsRouter.post('/', ConnectionsControllers.create);
connectionsRouter.get('/', ConnectionsControllers.index);

export default connectionsRouter;
