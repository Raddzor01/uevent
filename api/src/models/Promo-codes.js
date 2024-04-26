import Model from '../models/Model.js';
import db from '../db/db.js';

class PromoCodes extends Model {

	constructor() {
		super("promo_codes");
	}

	async create(code, discount, eventId) {
		const query = `INSERT INTO promo_codes(code, discount, event_id) VALUES (?, ?, ?);`;
		const res = await db.makeRequest(query, [code, discount, eventId]);

		return res[0].insertId;
	}

	async read(id) {
		const data = await super.read(id);
		return data[0][0];
	}

	async checkFor(code, event_id) {
		const query = `SELECT * FROM promo_codes WHERE code = ? AND event_id = ?; `;
		const result = await db.makeRequest(query, [code, event_id]);
		return !!result[0].length;
	}

	async getAllEventsPromoCodes(event_id) {
		const query = `SELECT * FROM promo_codes WHERE event_id = ?; `;
		const result = await db.makeRequest(query, [event_id]);
		return result[0];
	}

	async checkPermission(promoCode_id, user_id) {
		const query = `SELECT * FROM promo_codes
    						INNER JOIN companies ON promo_codes.event_id = companies.id
                       		WHERE promo_codes.id = ? AND companies.user_id = ?;`;
		const result = await db.makeRequest(query, [promoCode_id, user_id]);
		return !!result[0].length;
	}

	async getDiscountEventPromoCode(code, event_id) {
		const query = `SELECT * FROM promo_codes WHERE code = ? AND event_id = ? LIMIT 1; `;
		const result = await db.makeRequest(query, [code, event_id]);
		return result[0][0].discount;
	}
}

const promoCodesTable = new PromoCodes();
export default promoCodesTable;