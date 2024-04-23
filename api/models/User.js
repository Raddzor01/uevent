import Model from "./Model.js";
import dbService from "../utils/dbService.js";

class User extends Model {
    constructor() {
        super("users");
    }

    async create(login, full_name, email, password) {
        const query = `INSERT INTO users(login, full_name, email, password) VALUES(?, ?, ?, ?);`;
        let res = await dbService.makeRequest(query, [login, full_name, email, password]);

        return this.read(res[0].insertId);
    }

    async read(id) {
        const data = await super.read(id);
        return data[0][0];
    }

    readByLogin = async(login) => {
        const sql = 'SELECT * FROM users WHERE login= ?; ';

        const result = await dbService.makeRequest(sql, [login]);

        if (result[0][0])
            return result[0][0];
        return -1;
    }

    updatePasswordByEmail = async(email, password) => {
        const sql = `UPDATE users SET password = ? WHERE email = ? ; `;

        await dbService.makeRequest(sql, [password, email]);
    }
}

const usersTable = new User();
export { usersTable };