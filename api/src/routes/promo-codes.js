import express from "express";
import controller from "../controllers/promo-codes.js";
import TokenService from '../service/token.js';
import { boundary } from "../middleware/error.js";
import { checkUserEventPermissions, checkUserPromoCodePermissions } from '../middleware/permissions-check.js';

const router = express.Router();

router.use(TokenService.authCheck);

router.get('/', boundary(controller.getPromoCodes));
router.post('/', checkUserEventPermissions, boundary(controller.createPromoCode));
router.get('/:id', checkUserPromoCodePermissions, boundary(controller.getPromoCode));
router.put('/:id', checkUserPromoCodePermissions, boundary(controller.updatePromoCode));
router.delete('/:id', checkUserPromoCodePermissions, boundary(controller.deletePromoCode));

export default router;