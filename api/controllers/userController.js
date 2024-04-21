import TokenService from "../utils/tokenService.js";
import User from "../models/User.js";
import {ClientError} from "../middleware/error.js";
import Company from "../models/Company.js";

export default class usersController {

    static async getUser(req, res){
        const userId = req.user.userId;

        const usersTable = new User();

        const userData = await usersTable.read(userId);

        if (!userData)
            throw new ClientError('This user does not exist', 404);

        res.status(200).json({userData});
    }

    static async updateUserPhoto(req, res) {
        if (!req.files)
            throw new ClientError('Please provide a valid file', 400);

        const userId = req.user.userId;



        const fileExtension = req.files.photo.name.split('.').pop();
        if(fileExtension !== "png" && fileExtension !== "jpg")
            throw new ClientError('Please provide a valid file', 400);

        const usersTable = new User();

        const fileName = 'IMG_' + Date.now() + '.' + fileExtension;
        await req.files.photo.mv("public/pics/" + fileName);
        await usersTable.update(userId, "picture", fileName);

        res.status(200).send();
    }

    static async deleteUserPhoto(req, res) {
        const userId = Number(req.params.id);

        const usersTable = new User();

        await usersTable.update(userId, "picture", "default_avatar.png");

        res.status(204).send();
    }

}