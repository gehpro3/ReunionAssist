import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
config(); // Optional: use .env for your API key

export async function handler(event, context) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY); // Or hardcode your key
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const userPrompt = "Tell me a compelling story about the Scotts’ legacy and craftsmanship.";
    const result = await model.generateContent(userPrompt);
    const response = await result.response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: response }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
