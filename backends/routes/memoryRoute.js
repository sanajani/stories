import express from 'express';

import { getMemories, createMemory, getMemory, deleteMemory, updateMemory } from '../controllers/createMemoryController.js';
import { upload } from '../middleware/uploadImage.js';
import { authanticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get("/", getMemories)
router.get("/:_id", getMemory)
router.post("/",authanticate,upload, createMemory)
router.patch("/:_id", authanticate,upload ,updateMemory)
router.delete("/:_id", authanticate ,deleteMemory)


export default router