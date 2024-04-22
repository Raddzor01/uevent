import express from "express";
import controller from "../controllers/companiesController.js";
import {checkUserCompanyRights} from "../middleware/permissions-check.js";
import TokenService from "../utils/tokenService.js";
import {boundary} from "../middleware/error.js";

const router = express.Router();

router.get('/', boundary(controller.getCompanies));
router.get('/:id', boundary(controller.getCompany));

router.use(TokenService.authCheck);

router.post('/', boundary(controller.createCompany));
router.delete('/:id', checkUserCompanyRights, boundary(controller.deleteCompany));
router.put('/:id', checkUserCompanyRights, boundary(controller.updateCompany));
router.post('/:id/avatar', checkUserCompanyRights, boundary(controller.updateCompanyPhoto));
router.delete('/:id/avatar', checkUserCompanyRights, boundary(controller.deleteCompanyPhoto));
router.post('/:id/connect-stripe', checkUserCompanyRights, boundary(controller.createStripeAccount));


export default router;