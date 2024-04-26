import Model from "./Model.js";
import db from "../db/db.js";

class Tickets extends Model {
	constructor() {
		super("tickets");
	}

	async create(user_id, event_id, isVisible) {
		const query = `INSERT INTO tickets(user_id, event_id, isVisible) VALUES (?, ?, ?);`;
		const res = await db.makeRequest(query, [user_id, event_id, isVisible]);

		return res[0].insertId;
	}

	async read(id) {
		const data = await super.read(id);
		return data[0][0];
	}

	async checkUserTicket(event_id, user_id) {
		const query = `SELECT * FROM tickets WHERE event_id = ? AND user_id = ? LIMIT 1; `;
		const res = await db.makeRequest(query, [event_id, user_id]);
		return !!res[0];
	}

}

const ticketsTable = new Tickets();
export default ticketsTable;