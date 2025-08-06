import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// IMPORTANT: Authenticate with your API key from an environment variable
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

export async function POST(request: Request) {
  try {
    // 1. Get the user's message from the request body
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 2. Call the Google AI API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(message);
    const response = result.response;
    const aiText = response.text();

    // 3. Send the AI's response back to the frontend
    return NextResponse.json({ reply: aiText });

  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
