
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("Gemini API key not found. AI features will be disabled. Please set the API_KEY environment variable.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const analysisSchema = {
    type: Type.OBJECT,
    properties: {
        distracting_elements: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of UI elements that are designed for endless scrolling or short-form content."
        },
        focus_elements: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of UI elements that are related to the main content or user interaction."
        },
        suggestion: {
            type: Type.STRING,
            description: "A brief suggestion on how to reduce distractions based on the identified elements."
        }
    },
    required: ["distracting_elements", "focus_elements", "suggestion"]
};

export const getGeminiResponse = async (description: string): Promise<string> => {
    if (!API_KEY) {
        // Return a mock response if API key is not available
        return new Promise(resolve => setTimeout(() => resolve(JSON.stringify({
            distracting_elements: ["AI functionality is disabled.", "Please provide an API key."],
            focus_elements: ["This is a mock response."],
            suggestion: "To use the AI analyzer, you need to configure your Gemini API key as an environment variable."
        })), 500));
    }

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze the following social media UI description and identify distracting elements. Description: "${description}"`,
        config: {
            responseMimeType: "application/json",
            responseSchema: analysisSchema,
        }
    });

    return response.text;
};
