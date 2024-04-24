import express from "express";
import controller from "../controllers/promo-codes.js";
import TokenService from '../service/token.js';
import { boundary } from "../middleware/error.js";
import { checkUserEventRights, checkUserPromoCodeRights } from '../middleware/permissions-check.js';

const router = express.Router();

router.use(TokenService.authCheck);

router.get('/', boundary(controller.getPromoCodes));
router.post('/', checkUserEventRights, boundary(controller.createPromoCode));
router.get('/:id', checkUserPromoCodeRights, boundary(controller.getPromoCode));
router.put('/:id', checkUserPromoCodeRights, boundary(controller.updatePromoCode));
router.delete('/:id', checkUserPromoCodeRights, boundary(controller.deletePromoCode));

export default router;