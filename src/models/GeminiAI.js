import { GoogleGenerativeAI } from "@google/generative-ai";

export default class GeminiAI {
    constructor(apiKey) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }
}