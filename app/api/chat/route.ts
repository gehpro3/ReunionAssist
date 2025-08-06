import { NextResponse } from 'next/server';

// You MUST export a named function corresponding to an HTTP method
// e.g., GET, POST, PUT, DELETE, etc.
export async function POST(request: Request) {
  try {
    // Your logic to handle the chat API will go here
    const body = await request.json();
    const { message } = body;

    // ... do something with the message ...

    // Return a response
    return NextResponse.json({ reply: "This is a response from the chat API" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
