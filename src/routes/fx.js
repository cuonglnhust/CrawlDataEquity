import { Router } from 'express';
import { isAuth } from '../middlewares/auth';
import { CoinController } from '../controllers';
import { Response } from '../libs/handle_response';
import FxController from '../controllers/FxController';

let routerApp = new Router();

routerApp.get('/copytrade',Response(FxController.CopyTrade));
routerApp.post('/update_signal',Response(FxController.UpdateSignal));
routerApp.get('/export',Response(FxController.ExportExcel));












export default routerApp;