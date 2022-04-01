
import { data } from 'cheerio/lib/api/attributes';
import { set } from 'lodash';
import { uploadMultiMedia } from '../libs/upload';
import MidCoin from '../models/middle/MidCoin';

class CoinController {
   async GetDataCoin (req,res) {
         const data = await MidCoin.getAllCoin();
         return data
   }
   async GetDataWeb (req,res) {
    const data = await MidCoin.getDataWeb();
    return data
    }

    async GetDataListCoin (req,res) {
        const dataCoin = await MidCoin.getDataCoinChecked();
        res.render('coins',{dataCoin: dataCoin})
    }

    async getCoinBuy (req,res) {
        //const data = await MidCoin.getCoinBuy();
        console.log('1111111111111', req.body);
        let data_test = {
            a: 1, 
            b:2
        }
        return data_test;
    }

    // async changePassword(req, res) {
    //     const userData = req.userData;
    //     const { oldPassword, password } = req.body;
    //     return MidUser.updatePassword(oldPassword, password, userData);
    // }

    // async updateProfile(req, res) {
    //     const dataUpload = await uploadMultiMedia(req, res);
    //     let avatar = dataUpload[0] ? req.protocol + '://' + req.get('host') +'/' + dataUpload[0].filename : '';
        
    //     const userData = req.userData;
    //     const profile = req.body;
    //     return MidUser.updateProfile(profile, userData, avatar);
    // }

    // async getPermission(req, res) {
    //     let {userData} = req;

    //     if(!userData.distributor_id && !userData.collaborator_id){
    //         return await MidUser.getAllPermission();
    //     }

    //     if(userData.collaborator_id){
    //         return await MidUser.getCollabPermission();
    //     }

    //     let user_id = userData.id;

    //     return await MidUser.getPermissionByUserId(user_id);
    // }
    
}

export default new CoinController();