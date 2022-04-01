import { Router } from 'express';
import auth from './auth';
import fx from './fx';


let routerApp = new Router();
routerApp.use('/auth', auth);
routerApp.use('/fx', fx);





export default routerApp;