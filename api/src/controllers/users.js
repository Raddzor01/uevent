import usersTable from '../models/User.js';
import { ClientError } from "../middleware/error.js";
import { saveFile } from '../service/fileUpload.js';

class usersController {

    getUsers = async(req, res) => {
        const { eventId, comments } = req.query;

        let usersArray;
        if(eventId) {
            if(comments)
                usersArray = await usersTable.getUsersEventComments(eventId);
            // else
                // usersArray = await usersTable.getEventSubscribers(eventId);
        } else
            usersArray = await usersTable.getAll();

        res.status(200).json({
            usersArray,
        });
    }

    getUser = async(req, res) =>{
        const userId =  Number(req.params.id);

        const userData = await usersTable.read(userId);

        if (!userData)
            throw new ClientError('This user does not exist', 404);

        res.status(200).json({ userData });
    }

    updateUserPhoto = async(req, res) => {
        const userId = Number(req.params.id);
        const file = req.files;

        if (!file)
            throw new ClientError('Please provide a valid file', 400);

        const fileName = await saveFile(file);
        await usersTable.update(userId, "picture", fileName);

        res.sendStatus(200);
    }

    deleteUserPhoto = async(req, res) => {
        const userId = Number(req.params.id);

        await usersTable.update(userId, "picture", "default_avatar.png");

        res.sendStatus(204);
    }


}

const controller = new usersController();
export default controller;
