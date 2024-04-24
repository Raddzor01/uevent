import express from "express";
import controller from "../controllers/companies.js";
import TokenService from "../service/token.js";
import { boundary } from "../middleware/error.js";
import { checkUserCompanyPermissions } from "../middleware/permissions-check.js";

const router = express.Router();

router.get('/', boundary(controller.getCompanies));
router.get('/:id', boundary(controller.getCompany));

router.use(TokenService.authCheck);

router.post('/', boundary(controller.createCompany));
router.delete('/:id', checkUserCompanyPermissions, boundary(controller.deleteCompany));
router.put('/:id', checkUserCompanyPermissions, boundary(controller.updateCompany));
router.post('/:id/avatar', checkUserCompanyPermissions, boundary(controller.updateCompanyPhoto));
router.delete('/:id/avatar', checkUserCompanyPermissions, boundary(controller.deleteCompanyPhoto));
router.get('/:id/connect-stripe', checkUserCompanyPermissions, boundary(controller.getStripeAccount));
router.post('/:id/connect-stripe', checkUserCompanyPermissions, boundary(controller.createStripeAccount));


export default router;