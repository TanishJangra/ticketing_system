import express from 'express';
import { createVisitor } from '../controllers/visitorController.js';

const router = express.Router();
router.post('/', createVisitor);

export default router;
