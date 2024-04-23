import mysql from 'mysql2';

export default class dbService {
    static async makeRequest(sql, values = null) {
        const db = await this.connectToDatabase();
        let result = await db.promise().execute(sql, values).catch(reason => { throw new Error(reason) });
        db.end();

        return result;
    }

    static async connectToDatabase() {
        const db = mysql.createConnection({
            host: process.env.DATABASE_HOST,
            user: process.env.DATABASE_USER,
            database: process.env.DATABASE_NAME,
            password: process.env.DATABASE_PASSWORD
        });
        db.connect((err) => {
            if (err) return console.error("Error: " + err.message);
        });
        return db;
    }
}