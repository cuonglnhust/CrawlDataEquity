import { MidUser, MidDistributor } from '../models/middle';
import { uploadMultiMedia } from '../libs/upload';

class UserController {
    async getUserInfo(req, res) {
        let { userData } = req;
        userData = userData.toJSON();
        if (!userData.distributor_id) {
            userData.distributor = "";
        } else {
            const distributorData = await MidDistributor.getDistributorById(userData.distributor_id);
            userData.distributor = distributorData || "";
        }

        return userData;
    }

    async changePassword(req, res) {
        const userData = req.userData;
        const { oldPassword, password } = req.body;
        return MidUser.updatePassword(oldPassword, password, userData);
    }

    async updateProfile(req, res) {
        const dataUpload = await uploadMultiMedia(req, res);
        let avatar = dataUpload[0] ? req.protocol + '://' + req.get('host') +'/' + dataUpload[0].filename : '';
        
        const userData = req.userData;
        const profile = req.body;
        return MidUser.updateProfile(profile, userData, avatar);
    }

    async getPermission(req, res) {
        let {userData} = req;

        if(!userData.distributor_id && !userData.collaborator_id){
            return await MidUser.getAllPermission();
        }

        if(userData.collaborator_id){
            return await MidUser.getCollabPermission();
        }

        let user_id = userData.id;

        return await MidUser.getPermissionByUserId(user_id);
    }
    
}

export default new UserController();