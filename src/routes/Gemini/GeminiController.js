import GeminiAI from "../../models/GeminiAI.js";
import dotenv from 'dotenv';

dotenv.config();

class GeminiController{
    constructor(){
        this.geminiAI = new GeminiAI(process.env.APIKEY);
    }

    promptToGemini = async (req, res) => {
        try {
            const { prompt } = req.body;
            const result = await this.geminiAI.model.generateContent(prompt);
            const text = result.response.text();
            res.status(200).json({answer: text});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
}

export default GeminiController;