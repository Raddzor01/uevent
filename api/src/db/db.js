import mysql from 'mysql2';
import { DATABASE_CONFIG } from '../../consts/default.js';

export default class db {
    static async makeRequest(sql, values = null) {
        const db = await this.connectToDatabase();
        let result = await db.promise().execute(sql, values).catch(reason => { throw new Error(reason) });
        db.end();

        return result;
    }

    static async connectToDatabase() {
        const db = mysql.createConnection(DATABASE_CONFIG);
        db.connect((err) => {
            if (err) return console.error("Error: " + err.message);
        });
        return db;
    }
}