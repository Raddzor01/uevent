import TokenService from "../utils/tokenService.js";
import User from "../models/User.js";
import {ClientError} from "../middleware/error.js";

export default class usersController {

    static async getUser(req, res){
        const reqId = Number(req.params.id);
        const token = req.cookies.token;
        const { userId } = await TokenService.getData(token);

        if(userId !== reqId)
            throw new ClientError('Forbidden action', 403);

        const usersTable = new User();

        const userData = await usersTable.read(reqId);

        if (!userData)
            throw new ClientError('This user does not exist', 404);

        res.status(200).json({userData});
    }

    static async updateUserPhoto(req, res) {
        const token = req.cookies.token;
        const { userId } = await TokenService.getData(token);
        const usersTable = new User();

        const filePath = '/pics/IMG_' + Date.now() + '.' + req.files.photo.name.split('.').pop();

        await req.files.photo.mv("public" + filePath);
        await usersTable.update(userId, "picture", filePath);

        res.status(200).send();
    }
}