import Model from "./Model.js";
import db from "../db/db.js";
import { ClientError } from '../middleware/error.js';
import stripe from '../service/stripe.js';

class Company extends Model {
    constructor() {
        super("companies");
    }

	async create(name, email, latitude, longitude, user_id) {
		const query = `INSERT INTO companies(name, email, latitude, longitude, user_id) VALUES(?, ?, ?, ?, ?);`;
		const res = await db.makeRequest(query, [name, email, latitude, longitude, user_id]);

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

	async getAllUserCompanies(userId) {
		const query = `SELECT * FROM companies WHERE user_id = ?`;
		const companiesArray = await db.makeRequest(query, [userId]);
		return companiesArray[0];
	}

	async checkStripeAccount(company_id) {
		const company = await companiesTable.read(company_id);

		if(!company)
			throw new ClientError("Company not found", 404);

		if(!company.stripe_id)
			throw new ClientError("Stripe account does not exist or connected", 403);

		const account = await stripe.accounts.retrieve(company.stripe_id);
		if (!account.details_submitted)
			throw new ClientError('Company has not completed their account', 403);

		return company.stripe_id;
	}
}

const companiesTable = new Company();
export default companiesTable;
