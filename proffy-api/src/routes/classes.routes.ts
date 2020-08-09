import { Router } from 'express';
import ClassesController from '../controllers/ClassesController';

const classesRouter = Router();
const ClassesControllers = new ClassesController();

classesRouter.post('/', ClassesControllers.create);

export default classesRouter;
