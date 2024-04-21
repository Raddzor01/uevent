import express from "express";
import controller from "../controllers/eventsController.js";
import TokenService from "../utils/tokenService.js";
import {boundary} from "../middleware/error.js";
import {checkUserCompanyRights, checkUserEventRights} from "../middleware/permissions-check.js";

const router = express.Router();

router.get("/", boundary(controller.getAllCompanyEvents));
router.get("/:id", boundary(controller.getEvent));

router.use(TokenService.authCheck);

router.post("/", checkUserCompanyRights, boundary(controller.createEvent));
router.patch("/:id", checkUserEventRights, boundary(controller.updateEvent));
router.delete("/:id", checkUserEventRights, boundary(controller.deleteEvent));
router.post('/:id/avatar', checkUserEventRights, boundary(controller.updateEventPhoto));
router.delete('/:id/avatar', checkUserEventRights, boundary(controller.deleteEventPhoto));

export default router;
