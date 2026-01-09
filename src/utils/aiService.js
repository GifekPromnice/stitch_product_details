// src/utils/aiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
// IMPORTANT: User needs to provide VITE_GEMINI_API_KEY in .env
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "YOUR_API_KEY_HERE");

/**
 * Converts a File object to a GoogleGenerativeAI.Part object (Base64).
 */
async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
    });
    return {
        inlineData: {
            data: await base64EncodedDataPromise,
            mimeType: file.type,
        },
    };
}

/**
 * Sends an image to Gemini Pro Vision for analysis.
 */
export const analyzeImageWithAI = async (imageFile) => {
    try {
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
            console.warn("Missing VITE_GEMINI_API_KEY. Falling back to mock data for demo.");
            // Fallback Mock if no key provided
            await new Promise(r => setTimeout(r, 1000));
            return {
                title: "Demo Item (No API Key)",
                price: 99,
                category: "decor",
                condition: "good",
                color: "other",
                tags: ["demo", "no-key", "setup-required"],
                description: "This is a demo result because VITE_GEMINI_API_KEY is missing in your .env file."
            };
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const imagePart = await fileToGenerativePart(imageFile);

        const prompt = `
        You are an expert furniture appraiser and copywriter. Analyze this image of a furniture item.
        Return ONLY a raw JSON object (no markdown formatting, no backticks) with the following fields:
        - title: A short, catchy, descriptive title (e.g., "Vintage Oak Coffee Table").
        - category: One of EXACTLY these values: 'sofas', 'tables', 'lighting', 'chairs', 'shelves', 'rugs', 'kitchens', 'wardrobes', 'lamps', 'drawers', 'decor'. If unsure, use 'decor'.
        - condition: One of: 'new', 'good', 'fair', 'used'. Estimate based on visual wear.
        - color: One of: 'black', 'white', 'gray', 'beige', 'brown', 'red', 'blue', 'green', 'yellow', 'other'.
        - price: An estimated value number (integer) in USD/PLN (just the number).
        - tags: An array of 5-7 relevant keywords (strings) for searching (e.g., ["vintage", "wooden", "mid-century"]).
        - description: A professional, appealing description (2-3 sentences) selling the item.
        
        Example JSON format:
        {
          "title": "Modern Grey Sofa",
          "category": "sofas",
          "condition": "good",
          "color": "gray",
          "price": 450,
          "tags": ["modern", "comfortable", "living room"],
          "description": "A beautiful modern sofa."
        }
        `;

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if Gemini adds them
        const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanedText);

    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        throw error;
    }
};
