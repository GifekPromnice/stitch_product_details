// src/utils/aiService.js
import { GoogleGenAI } from "@google/genai";

// Initialize the Google Gen AI client with the API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Base client for the SDK
const genAI = new GoogleGenAI({
    apiKey: apiKey,
});

/**
 * Converts a browser File object to a Base64 string for the Gemini API.
 */
async function fileToGenerativePart(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result.split(",")[1];
            resolve({
                inlineData: {
                    data: base64Data,
                    mimeType: file.type,
                },
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Analyzes an image using Gemini 2.0 Flash and returns structured product data.
 * This is a clean re-implementation using the latest SDK and model.
 */
export const analyzeImageWithAI = async (imageFile) => {
    // 1. Basic validation
    if (!apiKey || apiKey === "YOUR_API_KEY_HERE" || apiKey.trim() === "") {
        console.warn("AI DEBUG: Missing VITE_GEMINI_API_KEY. Falling back to mock data.");
        await new Promise(r => setTimeout(r, 1500)); // Simulate delay
        return {
            title: "Stylowy Mebel (Podgląd)",
            price: 250,
            category: "decor",
            condition: "good",
            color: "beige",
            tags: ["retro", "drewno", "odnowiony"],
            description: "To jest przykładowy opis. Skonfiguruj klucz Gemini w .env, aby uzyskać prawdziwą analizę."
        };
    }

    try {
        console.log("%c AI DEBUG: Starting analysis with Gemini 2.5 Flash... ", "background: #222; color: #bada55");

        const imagePart = await fileToGenerativePart(imageFile);

        const prompt = `
            Analyze this furniture image and provide details for a listing.
            Return ONLY a raw JSON object (no markdown, no backticks) in Polish.
            
            JSON structure:
            {
              "title": "Short catchy Polish title",
              "category": "One of: sofas, tables, lighting, chairs, shelves, rugs, kitchens, wardrobes, lamps, drawers, decor",
              "condition": "One of: new, good, fair, used",
              "color": "One of: black, white, gray, beige, brown, red, blue, green, yellow, other",
              "price": Number (estimated price in PLN),
              "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
              "description": "2 sentence Polish description"
            }
        `;

        // 2. Call the Gemini 2.5 Flash model
        const result = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    role: "user",
                    parts: [
                        { text: prompt },
                        imagePart
                    ]
                }
            ],
            config: {
                responseMimeType: "application/json"
            }
        });

        // 3. Extract and parse response
        let responseText = "";
        try {
            // result.text is a function in the recent @google/genai SDK
            responseText = typeof result.text === 'function' ? result.text() : result.text;
        } catch (e) {
            console.warn("AI DEBUG: result.text() failed, trying alternative paths...");
            responseText = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
        }

        console.log("AI DEBUG: Raw Response:", responseText);

        const parsedData = JSON.parse(responseText);
        console.log("AI DEBUG: Parsed Data:", parsedData);

        return parsedData;

    } catch (error) {
        console.error("AI DEBUG: Analysis Critical Error:", error);

        // Handle specific 404/not available errors by falling back to 1.5-flash
        if (error.message?.includes("404") || error.message?.includes("not found")) {
            console.warn("AI DEBUG: Gemini 2.0 not found, trying fallback to 1.5-flash...");
            const fallbackResult = await genAI.models.generateContent({
                model: "gemini-1.5-flash",
                contents: [{ role: "user", parts: [{ text: "Analyze as furniture JSON: " + imageFile.name }, await fileToGenerativePart(imageFile)] }]
            });
            return JSON.parse(fallbackResult.text());
        }

        throw new Error("AI Analysis failed: " + (error.message || "Unknown error"));
    }
};
