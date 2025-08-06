"use client"; // This is crucial. It tells Next.js this is an interactive component.

import { useState } from 'react';

export default function Home() {
  // State to hold what the user types
  const [prompt, setPrompt] = useState("");
  
  // State to hold the AI's response
  const [aiResponse, setAiResponse] = useState("");

  // State to show a loading message
  const [isLoading, setIsLoading] = useState(false);

  // This function runs when the button is clicked
  const handleRunAI = async () => {
    setIsLoading(true);
    setAiResponse("");

    try {
      // 1. Call your own backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: prompt }), // Send the content of the input box
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // 2. Get the AI's reply and display it
      const data = await response.json();
      setAiResponse(data.reply);

    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      setAiResponse("Sorry, something went wrong. Please make sure your API key is set in Vercel.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>Welcome to Reunion Assist</h1>
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        style={{ width: '100%', minHeight: '80px', padding: '0.5rem', marginTop: '1rem' }}
      />
      
      <button 
        onClick={handleRunAI} 
        disabled={isLoading || !prompt}
        style={{ marginTop: '0.5rem', padding: '0.75rem 1.5rem', cursor: 'pointer' }}
      >
        {isLoading ? "Thinking..." : "Run AI"}
      </button>

      {aiResponse && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0', border: '1px solid #ccc', whiteSpace: 'pre-wrap' }}>
          <h2>AI Response:</h2>
          <p>{aiResponse}</p>
        </div>
      )}
    </main>
  );
}
