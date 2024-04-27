import express from "express";
import controller from "../controllers/companySubscriptions.js";
import { boundary } from "../middleware/error.js";
import TokenService from '../service/token.js';

const router = express.Router();

router.use(TokenService.authCheck);

router.post('/:id', boundary(controller.subscribeToCompany));
router.delete('/:id', boundary(controller.unsubscribeToCompany));

export default router;