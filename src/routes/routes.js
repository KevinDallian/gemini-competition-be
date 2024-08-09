import { Router } from "express";
import GeminiRoutes from './Gemini/GeminiRoutes.js';

const router = Router();
router.use(GeminiRoutes);

export default router;