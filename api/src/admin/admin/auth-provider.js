import { DefaultAuthProvider } from 'adminjs';
import componentLoader from './component-loader.js';

import db from "../../db/db.js";
import { comparePasswords } from '../../service/hash.js';


const provider = new DefaultAuthProvider({
    componentLoader,
    authenticate: async ({ email, password }) => {
        const query = `SELECT * FROM users WHERE email = ? AND type = 'admin' LIMIT 1; `;

        const rows = await db.makeRequest(query, [email]);
        const user = rows[0][0];

        if(!user || !await comparePasswords(password, user.password))
            return null;

        return { email };
    },
});
export default provider;
