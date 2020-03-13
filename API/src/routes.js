import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// Não precisam de autenticação

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// Precisam de autenticação
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.get('/users/:id', UserController.show);
routes.delete('/users/:id', UserController.delete);

export default routes;
