import express from "express";

import controller from "../controllers/formatsController.js";

const boundary = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        next(err);
    }
};

const router = express.Router();

router.get('/', boundary(controller.getAllFormats));
router.post('/', boundary(controller.createFormat));
// router.get('/:id', boundary(controller.getCalendar));
// router.delete('/:id', checkUserCompanyRights, boundary(controller.deleteCompany));
// router.put('/:id', checkUserCompanyRights, boundary(controller.updateCompany));
// router.post('/:calendarId/add', boundary(controller.addUserToCalendar));
// router.delete('/:calendarId/delete', boundary(controller.deleteUserFromCalendar));


export default router;