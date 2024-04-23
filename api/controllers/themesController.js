import { themesTable } from '../models/Themes.js';
import { ClientError } from "../middleware/error.js";

export default class themesController {

    static async getAllThemes(req, res) {
        const themes = await themesTable.getAll();

        res.status(200).json({themes});
    }

    static async getTheme(req, res) {
        const themeId = Number(req.params.id);

        const theme = await themesTable.read(themeId);

        if(!theme)
            throw new ClientError('Theme not found', 404);

        res.status(200).json(theme);
    }

    static async createTheme(req, res) {
        const { name } = req.body;

        if(await themesTable.checkFor("name", name))
            throw new ClientError(`Theme already exists`, 400);

        const themeId = await themesTable.create(name);

        res.status(200).json({themeId});
    }

    static async updateTheme(req, res) {
        const themeId = Number(req.params.id);
        const { name } = req.body;

        if(!await themesTable.checkFor("name", name))
            throw new ClientError(`Theme already exists`, 400);

        await themesTable.update(themeId, "name", name);

        res.status(201).send();
    }

    static async deleteTheme(req, res) {
        const themeId = Number(req.params.id);

        await themesTable.delete(themeId);

        res.status(204).send();
    }


}