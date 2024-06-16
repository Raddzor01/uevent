import express from "express";
import controller from "../controllers/themes.js";
import { boundary } from "../middleware/error.js";

const router = express.Router();

router.get('/', boundary(controller.getAllThemes));
router.get('/:id', boundary(controller.getTheme));



// router.post('/', boundary(controller.createTheme));
// router.put('/:id', boundary(controller.updateTheme));
// router.delete('/:id', boundary(controller.deleteTheme));

export default router;