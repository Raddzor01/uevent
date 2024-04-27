import Model from "./Model.js";
import db from "../db/db.js";

class CompanySubscriptions extends Model {
	constructor() {
		super("companySubscriptions");
	}

	async create(user_id, company_id) {
		const query = `INSERT INTO companysubscriptions(user_id, company_id) VALUES(?, ?);`;
		const res = await db.makeRequest(query, [user_id, company_id]);

		return res[0].insertId;
	}

	async read(id) {
		const data = await super.read(id);
		return data[0][0];
	}

	async getAllCompanySubscriptions(company_id) {
		const query = `SELECT * FROM companysubscriptions WHERE company_id = ?`;
		const companiesArray = await db.makeRequest(query, [company_id]);
		return companiesArray[0];
	}

	checkCompanySubscription = async(company_id, user_id) => {
		const query = `SELECT COUNT(*) AS count FROM companysubscriptions
                                WHERE company_id = ? AND user_id = ?; `;
		const res = await db.makeRequest(query, [company_id, user_id]);
		return !!res[0][0].count;
	}

	async delete(user_id, company_id) {
		const query = `DELETE FROM companysubscriptions WHERE user_id = ? and company_id = ?; `;
		await db.makeRequest(query, [user_id, company_id]);
	}
}

const companySubscriptionsTable = new CompanySubscriptions();
export default companySubscriptionsTable;