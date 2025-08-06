"use client"; // This line is crucial for interactive components

import { useState } from 'react';

export default function Home() {
  // State to hold the text the user types into the input box
  const [prompt, setPrompt] = useState("");
  
  // State to hold the response we get back from the AI
  const [aiResponse, setAiResponse] = useState("");

  // State to show a "Loading..." message while we wait for the AI
  const [isLoading, setIsLoading] = useState(false);

  // This function runs when the "Run AI" button is clicked
  const handleRunAI = async () => {
    setIsLoading(true);
    setAiResponse("");

    try {
      // Send the user's prompt to our backend API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: prompt }), // Send the text from the input box
      });

      if (!response.ok) {
        throw new Error('Something went wrong on the server.');
      }

      // Get the AI's reply from the API response
      const data = await response.json();
      setAiResponse(data.reply);

    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      setAiResponse("Sorry, there was an error. Please check the logs.");
    } finally {
      setIsLoading(false); // Stop the loading indicator
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>Welcome to Reunion Assist</h1>
      
      {/* Input box for the user's prompt */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        style={{ width: '100%', minHeight: '80px', padding: '0.5rem', marginTop: '1rem' }}
      />
      
      {/* The button that triggers the AI call */}
      <button 
        onClick={handleRunAI} 
        disabled={isLoading || !prompt}
        style={{ marginTop: '0.5rem', padding: '0.75rem 1.5rem', cursor: 'pointer' }}
      >
        {isLoading ? "Thinking..." : "Run AI"}
      </button>

      {/* A section to display the response from the AI */}
      {aiResponse && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0', border: '1px solid #ccc', whiteSpace: 'pre-wrap' }}>
          <h2>AI Response:</h2>
          <p>{aiResponse}</p>
        </div>
      )}
    </main>
  );
}
