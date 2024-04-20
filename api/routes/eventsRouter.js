import express from "express";

import controller from "../controllers/eventsController.js";

const router = express.Router();

const boundary = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        next(err);
    }
};

router.get("/:id", boundary(controller.getEvent));
// router.delete(":eventId/kick", boundary(controller.kickUser));
router.patch("/:id", boundary(controller.updateEvent));
router.delete("/:id", boundary(controller.deleteEvent));
// router.post("/share/:token", boundary(controller.confirmEvent));
// router.post("/share", boundary(controller.shareEvent));
router.get("/", boundary(controller.getAllCompanyEvents));
router.post("/", boundary(controller.createEvent));
// router.post('/:calendarId/add', controller.addUserToCalendar);
// router.delete('/:calendarId/delete', controller.deleteUserFromCalendar);

export default router;
