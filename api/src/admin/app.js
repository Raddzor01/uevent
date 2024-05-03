import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';
import provider from './admin/auth-provider.js';
import options from './admin/options.js';
import initializeDb from './db/index.js';

await initializeDb();

const admin = new AdminJS(options);
if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
}
else {
    admin.watch();
}

const adminRouter = buildAuthenticatedRouter(admin, {
    cookiePassword: process.env.COOKIE_SECRET,
    cookieName: 'token',
    provider,
}, null, {
    secret: process.env.COOKIE_SECRET,
        saveUninitialized: true,
        resave: true,
    });

export { admin, adminRouter };