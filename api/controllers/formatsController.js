import Formats from "../models/Formats.js";
import {ClientError} from "../middleware/error.js";
import Themes from "../models/Themes.js";

export default class formatsController {

    static async getAllFormats(req, res) {
        const formatsTable = new Formats();

        const formats = await formatsTable.getAll();
        res.status(200).json({formats});
    }

    static async getFormat(req, res) {
        const formatId = Number(req.params.id);

        const themesTable = new Themes();

        const format = await themesTable.read(formatId);

        if(!format)
            throw new ClientError('Format not found', 404);

        res.status(200).json(format);
    }

    static async createFormat(req, res) {
        const { name } = req.body;

        const formatsTable = new Formats();

        if(await formatsTable.checkFor("name", name))
            throw new ClientError(`Format already exists`, 400);

        const formatId = await formatsTable.create(name);

        res.status(200).json({formatId});
    }

    static async updateFormat(req, res) {
        const formatId = Number(req.params.id);
        const { name } = req.body;

        const formatsTable = new Formats();

        if(!await formatsTable.checkFor("name", name))
            throw new ClientError(`Format already exists`, 400);

        await formatsTable.update(formatId, "name", name);

        res.status(201).send();
    }

    static async deleteFormat(req, res) {
        const formatId = Number(req.params.id);

        const formatsTable = new Formats();

        await formatsTable.delete(formatId);

        res.status(204).send();
    }
}