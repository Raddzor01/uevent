import Model from "./Model.js";
import db from "../db/db.js";

class User extends Model {
    constructor() {
        super("users");
    }

    async create(login, full_name, email, password) {
        const query = `INSERT INTO users(login, full_name, email, password) VALUES(?, ?, ?, ?);`;
        let res = await db.makeRequest(query, [login, full_name, email, password]);

        return this.read(res[0].insertId);
    }

    async read(id) {
        const data = await super.read(id);
        return data[0][0];
    }

    readByLogin = async(login) => {
        const sql = 'SELECT * FROM users WHERE login= ?; ';

        const result = await db.makeRequest(sql, [login]);

        if (result[0][0])
            return result[0][0];
        return -1;
    }

    updatePasswordByEmail = async(email, password) => {
        const sql = `UPDATE users SET password = ? WHERE email = ? ; `;

        await db.makeRequest(sql, [password, email]);
    }

    getUsersEventComments = async(event_id) => {
        const sql = `SELECT * FROM users
                    INNER JOIN comments ON users.id = comments.user_id
                    WHERE comments.event_id = ?; `;
        const res = await db.makeRequest(sql, [event_id]);
        return res[0];
    }
}

const usersTable = new User();
export default usersTable;