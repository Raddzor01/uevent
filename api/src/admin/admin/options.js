import { db } from '../db/index.js';
import componentLoader from './component-loader.js';
const options = {
    componentLoader,
    rootPath: '/admin',
    resources: [
        {
            resource: db.table('users'),
            options: {},
        },
        {
            resource: db.table('companies'),
            options: {},
        },
        {
            resource: db.table('events'),
            options: {},
        },
        {
            resource: db.table('promo_codes'),
            options: {},
        },
        {
            resource: db.table('tickets'),
            options: {},
        },
        {
            resource: db.table('companysubscriptions'),
            options: {},
        },
        {
            resource: db.table('themes'),
            options: {},
        },
        {
            resource: db.table('formats'),
            options: {},
        },
    ],
    databases: [],
};
export default options;
