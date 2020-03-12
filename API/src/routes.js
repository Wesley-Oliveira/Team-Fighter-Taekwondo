import { Router } from 'express';
import Usercontroller from './app/controllers/UserController';

const routes = new Router();

routes.post('/users', Usercontroller.store);

export default routes;
