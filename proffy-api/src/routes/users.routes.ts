import { Router, Request, Response } from 'express';

const usersRouter = Router();

usersRouter.get('/', (request: Request, response: Response) => {
  return response.json({ name: 'ok' });
});

export default usersRouter;
