import express from "express";
import authRouter from "./authRouter.js";
import companies from "./companiesRouter.js";
import events from "./eventsRouter.js";
import users from "./usersRouter.js";
import themes from "./themesRouter.js";
import formats from "./formatsRouter.js";
import TokenService from "../utils/tokenService.js";

const router = express.Router();

router.use('/auth', authRouter);
router.use('/companies', companies);
router.use('/events', events);
router.use('/users', users);
router.use('/themes', themes);
router.use('/formats', formats);
// router.use('/promo-codes', promoCodes);

export default router;