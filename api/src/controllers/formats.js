import formatsTable from '../models/Formats.js';
import { ClientError } from "../middleware/error.js";

class formatsController {

    getAllFormats = async(req, res) => {
        const formats = await formatsTable.getAll();
        res.status(200).json({ formats });
    }

    getFormat = async(req, res) => {
        const formatId = Number(req.params.id);

        const format = await formatsTable.read(formatId);

        if(!format)
            throw new ClientError('Format not found', 404);

        res.status(200).json({ format });
    }

    createFormat = async(req, res) => {
        const { name } = req.body;

        if(await formatsTable.checkFor("name", name))
            throw new ClientError(`Format already exists`, 400);

        const formatId = await formatsTable.create(name);

        res.status(200).json({ formatId });
    }

    updateFormat = async(req, res) => {
        const formatId = Number(req.params.id);
        const { name } = req.body;

        if(!await formatsTable.checkFor("name", name))
            throw new ClientError(`Format already exists`, 400);

        await formatsTable.update(formatId, "name", name);

        res.sendStatus(201);
    }

    deleteFormat = async(req, res) => {
        const formatId = Number(req.params.id);

        await formatsTable.delete(formatId);

        res.sendStatus(204);
    }
}

const controller = new formatsController();
export default controller;
