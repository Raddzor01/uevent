import Model from "./Model.js";
import db from "../db/db.js";

class Comments extends Model {
	constructor() {
		super("comments");
	}

	async create(content, user_id, event_id) {
		const query = `INSERT INTO comments(content, user_id, event_id) VALUES(?, ?, ?);`;
		const res = await db.makeRequest(query, [content, user_id, event_id]);

		return res[0].insertId;
	}

	async read(id) {
		const data = await super.read(id);
		return data[0][0];
	}

	async checkPermission(company_id, user_id) {
		const query = `SELECT id FROM companies WHERE id = ? AND user_id = ?; `;
		const rows = await db.makeRequest(query, [company_id, user_id]);
		return rows.length > 0;
	}

	async getAllEventComments(event_id) {
		const query = `SELECT * FROM comments WHERE event_id = ?`;
		const companiesArray = await db.makeRequest(query, [event_id]);
		return companiesArray[0];
	}
}

const commentsTable = new Comments();
export default commentsTable;