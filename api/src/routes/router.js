import express from "express";
import authRouter from "./auth.js";
import companies from "./companies.js";
import events from "./events.js";
import users from "./users.js";
import themes from "./themes.js";
import formats from "./formats.js";
import promoCodes from './promo-codes.js';
import comments from './comments.js';
import companySubscriptions from './companySubscriptions.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/companies', companies);
router.use('/companies-subscription/', companySubscriptions);
router.use('/events', events);
router.use('/users', users);
router.use('/themes', themes);
router.use('/formats', formats);
router.use('/promo-codes', promoCodes);
router.use('/comments', comments);

export default router;
