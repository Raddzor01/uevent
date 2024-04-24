import express from "express";
import controller from "../controllers/events.js";
import TokenService from "../service/token.js";
import { boundary } from "../middleware/error.js";
import { checkUserCompanyRights, checkUserEventRights } from "../middleware/permissions-check.js";

const router = express.Router();

router.get("/", boundary(controller.getEvents));
router.get("/:id", boundary(controller.getEvent));

router.use(TokenService.authCheck);

router.post("/", checkUserCompanyRights, boundary(controller.createEvent));
router.put("/:id", checkUserEventRights, boundary(controller.updateEvent));
router.delete("/:id", checkUserEventRights, boundary(controller.deleteEvent));
router.post('/:id/avatar', checkUserEventRights, boundary(controller.updateEventPhoto));
router.delete('/:id/avatar', checkUserEventRights, boundary(controller.deleteEventPhoto));

export default router;
