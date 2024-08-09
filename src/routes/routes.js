import { Router } from "express";
import GeminiRoutes from './GeminiRoutes.js';

const router = Router();
router.use(GeminiRoutes);

export default router;