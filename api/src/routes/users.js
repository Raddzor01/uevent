import express from "express";
import controller from "../controllers/users.js";
import TokenService from "../service/token.js";
import { boundary } from "../middleware/error.js";

const router = express.Router();

router.get('/', boundary(controller.getUsers));
router.get('/:id', boundary(controller.getUser));

router.use(TokenService.authCheck);

router.put('/:id', boundary(controller.updateUser));
router.post('/:id/avatar', boundary(controller.updateUserPhoto));
router.delete('/:id/avatar', boundary(controller.deleteUserPhoto));

export default router;