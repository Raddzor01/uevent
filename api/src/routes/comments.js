import express from "express";
import controller from "../controllers/comments.js";
import { boundary } from "../middleware/error.js";
import TokenService from '../service/token.js';
import { checkUserCommentPermissions } from '../middleware/permissions-check.js';

const router = express.Router();

router.get('/', boundary(controller.getAllComments));
router.get('/:id', boundary(controller.getComment));

router.use(TokenService.authCheck);

router.post('/', boundary(controller.createComment));
router.put('/:id', checkUserCommentPermissions, boundary(controller.updateComment));
router.delete('/:id', checkUserCommentPermissions, boundary(controller.deleteComment));

export default router;