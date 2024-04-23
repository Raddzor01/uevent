import { formatsTable } from '../models/Formats.js';

import {ClientError} from "../middleware/error.js";

export default class formatsController {

    static async getAllFormats(req, res) {
        const formats = await formatsTable.getAll();
        res.status(200).json({formats});
    }

    static async getFormat(req, res) {
        const formatId = Number(req.params.id);

        const format = await formatsTable.read(formatId);

        if(!format)
            throw new ClientError('Format not found', 404);

        res.status(200).json({format});
    }

    static async createFormat(req, res) {
        const { name } = req.body;

        if(await formatsTable.checkFor("name", name))
            throw new ClientError(`Format already exists`, 400);

        const formatId = await formatsTable.create(name);

        res.status(200).json({formatId});
    }

    static async updateFormat(req, res) {
        const formatId = Number(req.params.id);
        const { name } = req.body;

        if(!await formatsTable.checkFor("name", name))
            throw new ClientError(`Format already exists`, 400);

        await formatsTable.update(formatId, "name", name);

        res.sendStatus(201);
    }

    static async deleteFormat(req, res) {
        const formatId = Number(req.params.id);

        await formatsTable.delete(formatId);

        res.sendStatus(204);
    }
}