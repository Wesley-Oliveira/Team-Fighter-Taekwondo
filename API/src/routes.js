import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import WorkoutController from './app/controllers/WorkoutController';

const routes = new Router();

// Não precisam de autenticação

routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.get('/workouts', WorkoutController.index);
routes.get('/workouts/:id', WorkoutController.show);
routes.post('/workouts', WorkoutController.store);
routes.put('/workouts/:id', WorkoutController.update);
routes.delete('/workouts/:id', WorkoutController.delete);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// Precisam de autenticação
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

export default routes;
