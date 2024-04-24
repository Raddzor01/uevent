import Model from "./Model.js";
import db from "../db/db.js";

class Formats extends Model {
    constructor() {
        super("formats");
    }

    async create(name) {
        const query = `INSERT INTO formats(name) VALUES (?);`;
        const res = await db.makeRequest(query, [name]);

        return res[0].insertId;
    }

    async read(id) {
        const data = await super.read(id);
        return data[0][0];
    }
}

const formatsTable = new Formats();
export default formatsTable;