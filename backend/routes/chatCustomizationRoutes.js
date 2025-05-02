import express from 'express';
import { getCustomization, updateCustomization } from '../controllers/chatCustomizationController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getCustomization);
router.put('/', protect, updateCustomization);

export default router;
