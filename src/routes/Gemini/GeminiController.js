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
            const { destinations, days, startDate, endDate } = req.body;
            const prompt = `
Create a trip plan for ${days} days with the following destinations : ${destinations} in ${startDate} until ${endDate}.The trip plan should have a description, rating, budget, and a list of items to bring. Exclude any information that doesn't match the format.
Make sure to follow the following format for the overall information of the {days} days plan:
Trip Overview
Average rating (combine all the destinations rating and count the average):
Total amount of budget in USD (count the total of the range budget for each destination):
Average physical intensity (either low intensity / medium intensity / high intensity): 
Overall description:

After that make sure to follow the following format for each day, make sure to enter every point and use commas to separate the items:
##Title
##Day 1 - {date of day 1}
Destination:
Address: {street name & number} street, {city}, {country}
Description (maximum one paragraph):
Rating : {1-5}
Budget (with nominal price range in USD):
Physical Intensity (either low intensity / medium intensity / high intensity):
Activity Recommendation:
Items (with seperated comma):`;
            const result = await this.geminiAI.model.generateContent(prompt);
            const text = result.response.text();
            const parsedText = this.parseGeminiResponse(text);
            res.status(200).json({answer: parsedText});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    promptRandomRecommendations = async (req, res) => {
        try {
            const { country, existingDestinations } = req.body;
            const prompt = `
Create 3 random names of recommended tourist attraction places (not region or city) ${existingDestinations.length > 0 ? `other than ${existingDestinations} ` : ""}in ${country} without any explanation of the place, just the name of the destination. Make sure to follow the following format:
1. {name of the place}
            `
            console.log(prompt);
            const result = await this.geminiAI.model.generateContent(prompt);
            const text = result.response.text();
            const parsedText = this.removeBoldMarkdown(text);
            const recommendations = parsedText.split('\n').map(line => {
                return line.replace(/^\d+\.\s*/, '');
            });
            const filteredRecommendations = recommendations
                .filter((line) => line !== '')
                .map(recommendation => recommendation.trim())
            res.status(200).json({recommendations : filteredRecommendations});
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    parseGeminiResponse = (text) => {
        const splitSlashNText = this.splitSlashNText(text);
        const removeBoldMarkdown = this.removeBoldMarkdown(splitSlashNText);
        const splittedText = this.splitText(removeBoldMarkdown);
        console.log(splittedText);
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