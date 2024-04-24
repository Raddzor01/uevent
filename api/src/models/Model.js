import db from "../db/db.js";

export default class Model {

    constructor(table) {
        this.table = table;
    }

    async create(data) {
        const query = `INSERT INTO ${this.table} SET ${data} ; `;
        return await db.makeRequest(query);
    }

    async read(id) {
        const query = `SELECT * FROM ${this.table} WHERE id = ${id}; `;
        return await db.makeRequest(query);
    }

    async update(id, name, value) {
        const query = `UPDATE ${this.table} SET ${name} = ? WHERE id = ? ; `;
        await db.makeRequest(query, [value, id]);
    }

    async delete(id) {
        const query = `DELETE FROM ${this.table} WHERE id = ?; `;
        await db.makeRequest(query, [id]);
    }

    async checkFor(name, value) {
        const query = `SELECT * FROM ${this.table} WHERE ${name} = '${value}'; `;
        const result = await db.makeRequest(query);
        return !!result[0].length;
    }

    async getAll() {
        const query = `SELECT * FROM ${this.table}; `;
        const result = await db.makeRequest(query);
        return result[0];
    }
}