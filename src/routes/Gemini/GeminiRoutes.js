import { Router } from "express";
import GeminiController from "./GeminiController.js";

const router = Router();
const controller = new GeminiController();

router.post('/api/v1/prompt', controller.promptToGemini);

export default router;