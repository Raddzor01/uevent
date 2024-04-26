import express from "express";
import controller from "../controllers/events.js";
import TokenService from "../service/token.js";
import { boundary } from "../middleware/error.js";
import { checkUserCompanyPermissions, checkUserEventPermissions } from "../middleware/permissions-check.js";

const router = express.Router();

router.get("/", boundary(controller.getEvents));
router.get('/:id', boundary(controller.getEvent));

router.use(TokenService.authCheck);

router.post("/", checkUserCompanyPermissions, boundary(controller.createEvent));
router.put('/:id', checkUserEventPermissions, boundary(controller.updateEvent));
router.delete('/:id', checkUserEventPermissions, boundary(controller.deleteEvent));
router.post('/:id/avatar', checkUserEventPermissions, boundary(controller.updateEventPhoto));
router.delete('/:id/avatar', checkUserEventPermissions, boundary(controller.deleteEventPhoto));
router.post('/:id/payment', boundary(controller.createPayment));

export default router;
