import express from "express";

import controller from "../controllers/themesController.js";

const boundary = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        next(err);
    }
};

const router = express.Router();

router.get('/', boundary(controller.getAllThemes));
router.post('/', boundary(controller.createTheme));
// router.get('/:id', boundary(controller.getCalendar));
// router.delete('/:id', checkUserCompanyRights, boundary(controller.deleteCompany));
// router.put('/:id', checkUserCompanyRights, boundary(controller.updateCompany));
// router.post('/:calendarId/add', boundary(controller.addUserToCalendar));
// router.delete('/:calendarId/delete', boundary(controller.deleteUserFromCalendar));


export default router;