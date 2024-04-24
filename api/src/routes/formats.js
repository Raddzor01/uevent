import express from "express";
import controller from "../controllers/formats.js";
import { boundary } from "../middleware/error.js";

const router = express.Router();

router.get('/', boundary(controller.getAllFormats));
router.get('/:id', boundary(controller.getFormat));

router.post('/', boundary(controller.createFormat));
router.put('/:id', boundary(controller.updateFormat));
router.delete('/:id', boundary(controller.deleteFormat));

export default router;