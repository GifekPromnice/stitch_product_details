// src/utils/aiService.js

/**
 * Sends an image to an AI service to analyze its content.
 * Returns a structured object with suggested title, category, tags, etc.
 * 
 * @param {File} imageFile - The image file to analyze
 * @returns {Promise<Object>} - Analysis results
 */
export const analyzeImageWithAI = async (imageFile) => {
    // SIMULATED DELAY to mimic API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // IN A REAL SCENARIO:
    // Here we would convert the image to base64 and send it to OpenAI/Gemini API.
    // For now, we return a smart MOCK response based on random logic or just static specific examples
    // to demonstrate the UI flow.

    // Let's pretend the analysis detected a "Modern Green Sofa"
    // We can randomize slightly to show it's "thinking"

    // Simple logic to vary results based on file name just for fun if possible, otherwise random.
    const isChair = Math.random() > 0.5;

    if (isChair) {
        return {
            title: "Vintage Wooden Dining Chair",
            price: 120, // Suggested price
            category: "chairs",
            condition: "good",
            color: "brown",
            tags: ["vintage", "wooden", "dining", "mid-century", "furniture"],
            description: "A beautiful vintage wooden chair perfect for dining rooms. Sturdy construction with minimal wear."
        };
    } else {
        return {
            title: "Modern Green Velvet Sofa",
            price: 850,
            category: "sofas",
            condition: "new",
            color: "green",
            tags: ["modern", "velvet", "sofa", "green", "luxury", "living room"],
            description: "Luxurious green velvet sofa. Modern design, very comfortable and perfect for any contemporary living room."
        };
    }
};
