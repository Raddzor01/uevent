import express from "express";

import controller from "../controllers/userController.js";

const boundary = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (err) {
        next(err);
    }
};

const router = express.Router();

router.get('/:id', boundary(controller.getUser));
router.post('/photo', boundary(controller.updateUserPhoto));

export default router;