import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import WorkoutController from './app/controllers/WorkoutController';
import StudentsWorkoutsController from './app/controllers/StudentsWorkoutsController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// Não precisam de autenticação
routes.use(authMiddleware);
// Precisam de autenticação

// CRUD Students
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

// CRUD Workouts
routes.get('/workouts', WorkoutController.index);
routes.get('/workouts/:id', WorkoutController.show);
routes.post('/workouts', WorkoutController.store);
routes.put('/workouts/:id', WorkoutController.update);
routes.delete('/workouts/:id', WorkoutController.delete);

// CRUD Users
routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

// Pesquisas, adição e deleção no relacionamento das tabelas students e workouts
routes.get(
  '/students/:student_id/workouts',
  StudentsWorkoutsController.showStudent
);
routes.get(
  '/workouts/:workout_id/students',
  StudentsWorkoutsController.showWorkout
);
routes.delete(
  '/workout/:workout_id/student/:student_id',
  StudentsWorkoutsController.delete
);
routes.post('/workout/student', StudentsWorkoutsController.store);

export default routes;
