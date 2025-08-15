import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the AI client with the API key from Vercel's environment variables
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: Request) {
  try {
    // Get the user's prompt from the request
    const body = await request.json();
    const { message } = body;

    // Make sure a message was provided
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Call the Google AI model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(message);
    const response = result.response;
    const aiText = response.text();

    // Send the AI's response back to the frontend
    return NextResponse.json({ reply: aiText });

  } catch (error) {
    // If anything goes wrong, log the error and send a generic failure message
    console.error("Error in API route:", error);
    return NextResponse.json({ error: 'An error occurred while communicating with the AI service.' }, { status: 500 });
  }
}
