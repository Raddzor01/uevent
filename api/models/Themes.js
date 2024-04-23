import Model from "./Model.js";
import dbService from "../utils/dbService.js";

class Themes extends Model {
    constructor() {
        super("themes");
    }

    async create(name) {
        const query = `INSERT INTO themes(name) VALUES (?);`;
        const res = await dbService.makeRequest(query, [name]);

        return res[0].insertId;
    }
}

const themesTable = new Themes();
export { themesTable };