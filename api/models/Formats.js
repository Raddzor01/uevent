import Model from "./Model.js";
import dbService from "../utils/dbService.js";

export default class Formats extends Model {
    constructor() {
        super("formats");
    }

    async create(name) {
        const query = `INSERT INTO formats(name) VALUES (?);`;
        const res = await dbService.makeRequest(query, [name]);

        return res[0].insertId;
    }

    async
}