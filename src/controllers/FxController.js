
import { set } from 'lodash';
import { uploadMultiMedia } from '../libs/upload';
import MidFx from '../models/middle/MidFx';

class FxController {
    async GetDataFx (req,res) {
        const data = await MidFx.GetDataFx();
        return data
    }
    async CopyTrade (req, res) {
        const data = await MidFx.CopyTrade();
    }
    async UpdateSignal (req, res) {
        const list_signal = req.body;
        const data = await MidFx.UpdateDataSignal(list_signal.data_list);
    }
    async ExportExcel (req, res) {
        const data = await MidFx.ExportXlsx();
    }
}

export default new FxController();