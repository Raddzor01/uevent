import Model from "./Model.js";
import dbService from "../utils/dbService.js";

class Event extends Model {

    constructor() {
        super("events");
    }

    async create(name, description, date, price, tickets_available, latitude, longitude, company_id, format_id, theme_id) {
        const query = `INSERT INTO events(name, description, date, price, tickets_available, latitude, longitude, company_id, format_id, theme_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
        const res = await dbService.makeRequest(query, [name, description, date, price, tickets_available, latitude, longitude, company_id, format_id, theme_id]);

        return res[0].insertId;
    }

    async read(id) {
        const data = await super.read(id);
        return data[0][0];
    }


    async getAllCompanyEvents(companyId) {
        const query = `SELECT * FROM events WHERE company_id = ?`;
        const rows = await dbService.makeRequest(query, [companyId]);
        return rows[0];
    }

}

const eventsTable = new Event();
export { eventsTable }
