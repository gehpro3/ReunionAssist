import { NextResponse } from 'next/server';

/**
 * Handles GET requests to /api/chat.
 * @returns A JSON response with a message.
 */
export async function GET() {
  // Return a simple JSON response
  return NextResponse.json({ message: "Hello from the Chat API!" });
}

/**
 * Handles POST requests to /api/chat.
 * @param {Request} request - The incoming request object.
 * @returns A JSON response confirming receipt of the message.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received message:", body.message);
    
    // Echo the message back or add your custom logic here
    return NextResponse.json({ reply: `You said: ${body.message}` });

  } catch (error) {
    return NextResponse.json({ error: 'There was an error processing your request.' }, { status: 500 });
  }
}
