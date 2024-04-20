import Themes from "../models/Themes.js";

export default class themesController {

    static async getAllThemes(req, res) {
        const themesTable = new Themes();

        const themes = await themesTable.getAll();
        res.status(200).json({themes});
    }

    static async createTheme(req, res) {
        const { name } = req.body;

        const themesTable = new Themes();

        const themeId = await themesTable.create(name);

        res.status(200).json({themeId});
    }
}