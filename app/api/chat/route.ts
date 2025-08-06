import { NextResponse } from 'next/server';

// This is the only function we will run.
export async function POST(request: Request) {

  // Get the API key directly from the environment.
  const apiKey = process.env.GOOGLE_API_KEY;

  // Check if the key exists and has content.
  if (apiKey && apiKey.length > 5) {
    // If it exists, return a SUCCESS message.
    // We will show only the last 4 characters for security.
    return NextResponse.json({ 
      status: "SUCCESS: Vercel found the API Key.",
      keyPreview: `...${apiKey.slice(-4)}` 
    });
  } else {
    // If it's missing, return a FAILURE message.
    return NextResponse.json({ 
      status: "FAILURE: The GOOGLE_API_KEY is MISSING in the Vercel server environment."
    }, { status: 500 }); // Send a server error status
  }
}
