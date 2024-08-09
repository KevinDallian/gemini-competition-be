import { Router } from "express";
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.APIKEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
const router = Router();

router.get('/api/v1/prompt', async (req, res) => {
    const prompt = "Write a story about an AI and magic"

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.json(result.response.text());
});

export default router;