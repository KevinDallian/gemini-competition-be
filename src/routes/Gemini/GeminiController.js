import GeminiAI from "../../models/GeminiAI.js";
import dotenv from 'dotenv';
import Parser from "../../models/Parser.js";

dotenv.config();

class GeminiController{
    states = {
        TITLE: 'title',
        DAY: 'day',
        DESTINATION: 'destination',
        DESCRIPTION: 'description',
        RATING: 'rating',
        BUDGET: 'budget',
        INTENSITY: 'intensity',
        ACTIVITY: 'activity',
        ITEMS: 'items',
    };

    constructor(){
        this.geminiAI = new GeminiAI(process.env.APIKEY);
    }

    promptToGemini = async (req, res) => {
        try {
            const { destinations, days } = req.body;
            const prompt = `
Create a trip plan for ${days} days with the following destinations : ${destinations}. The trip plan should have a description, rating, budget, and a list of items to bring. Exclude any information that doesn't match the format. Make sure to follow the following format for each day and use commas to separate the items:
##Title
#Day 1
Destination:
Description:
Rating from 1-5:
Budget:
Physical Intensity from 1-5:
Activity Recommendation:
Items:`;
            const result = await this.geminiAI.model.generateContent(prompt);
            const text = result.response.text();
            const parsedText = this.parseGeminiResponse(text);
            res.status(200).json({answer: parsedText});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    parseGeminiResponse = (text) => {
        const splitSlashNText = this.splitSlashNText(text);
        const removeBoldMarkdown = this.removeBoldMarkdown(splitSlashNText);
        const splittedText = this.splitText(removeBoldMarkdown);
        const parser = new Parser()
        return parser.processData(splittedText);
    }

    removeBoldMarkdown = (text) => {
        return text.replace(/[*]{2}/g, '');
    }

    splitSlashNText = (text) => {
        return text.split('\n').filter((line) => line !== '').join('\n');
    }

    splitText = (text) => {
        return text.split('\n').filter((line) => line !== '');
    }
}

export default GeminiController;