import express from "express";
import controller from "../controllers/authController.js";
import { boundary } from "../middleware/error.js";

const router = express.Router();

router.post('/register', boundary(controller.registration));
router.post('/login',  boundary(controller.login));
router.post('/password-reset/:confirmToken',  boundary(controller.set_new_password));
router.post('/password-reset',  boundary(controller.password_reset));
router.post('/logout',  boundary(controller.logout));

export default router;