import Formats from "../models/Formats.js";

export default class formatsController {

    static async getAllFormats(req, res) {
        const formatsTable = new Formats();

        const formats = await formatsTable.getAll();
        res.status(200).json({formats});
    }

    static async createFormat(req, res) {
        const { name } = req.body;

        const formatsTable = new Formats();

        const formatId = await formatsTable.create(name);

        res.status(200).json({formatId});
    }
}