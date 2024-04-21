import Model from "./Model.js";
import dbService from "../utils/dbService.js";

export default class Company extends Model {
  constructor() {
    super("companies");
  }

  async create(name, email, latitude, longitude, user_id) {
    const query = `INSERT INTO companies(name, email, latitude, longitude, user_id) VALUES(?, ?, ?, ?, ?);`;
    const res = await dbService.makeRequest(query, [name, email, latitude, longitude, user_id]);

    return res[0].insertId;
  }

  async saveUserCompany(userId, eventId) {
    const query = `INSERT INTO user_events(user_id, event_id) VALUES(?, ?);`;
    const res = await dbService.makeRequest(query, [userId, eventId]);

    return res[0].insertId;
  }

  async read(id) {
    const data = await super.read(id);
    return data[0][0];
  }

  async checkPermission(company_id, user_id) {
    const query = `SELECT id FROM companies WHERE id = ? AND user_id = ?; `;
    const rows = await dbService.makeRequest(query, [company_id, user_id]);
    return rows.length > 0;
  }

  async getAllUserCalendars(userId) {
    const query = `SELECT * FROM calendars 
                            INNER JOIN userCalendars ON calendars.id = userCalendars.calendarId
                            WHERE usercalendars.userId = ?`;
    return await dbService.makeRequest(query, [userId]);
  }
}