import themesTable from '../models/Themes.js';
import { ClientError } from "../middleware/error.js";

class themesController {

    getAllThemes = async(req, res) => {
        const themes = await themesTable.getAll();

        res.status(200).json({ themes });
    }

    getTheme = async(req, res) => {
        const themeId = Number(req.params.id);

        const theme = await themesTable.read(themeId);

        if(!theme)
            throw new ClientError('Theme not found', 404);

        res.status(200).json(theme);
    }

    createTheme = async(req, res) => {
        const { name } = req.body;

        if(await themesTable.checkFor("name", name))
            throw new ClientError(`Theme already exists`, 400);

        const themeId = await themesTable.create(name);

        res.status(200).json({ themeId });
    }

    updateTheme = async(req, res) => {
        const themeId = Number(req.params.id);
        const { name } = req.body;

        if(!await themesTable.checkFor("name", name))
            throw new ClientError(`Theme already exists`, 400);

        await themesTable.update(themeId, "name", name);

        res.sendStatus(201);
    }

    deleteTheme = async(req, res) => {
        const themeId = Number(req.params.id);

        await themesTable.delete(themeId);

        res.sendStatus(204);
    }
}

const controller = new themesController();
export default controller;
