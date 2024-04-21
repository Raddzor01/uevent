import express from "express";
import controller from "../controllers/userController.js";
import TokenService from "../utils/tokenService.js";
import {boundary} from "../middleware/error.js";

const router = express.Router();

router.get('/:id', boundary(controller.getUser));

router.use(TokenService.authCheck);

router.post('/:id/avatar', boundary(controller.updateUserPhoto));
router.delete('/:id/avatar', boundary(controller.deleteUserPhoto));

export default router;