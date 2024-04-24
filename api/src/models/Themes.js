import Model from "./Model.js";
import db from "../db/db.js";

class Themes extends Model {
    constructor() {
        super("themes");
    }

    async create(name) {
        const query = `INSERT INTO themes(name) VALUES (?);`;
        const res = await db.makeRequest(query, [name]);

        return res[0].insertId;
    }

    async read(id) {
        const data = await super.read(id);
        return data[0][0];
    }
}

const themesTable = new Themes();
export default themesTable;