"use client"; // Marks the component as interactive

import { useState } from 'react';

export default function Home() {
  // State for the user's input
  const [prompt, setPrompt] = useState("");
  
  // State for the AI's response
  const [aiResponse, setAiResponse] = useState("");

  // State to manage the loading indicator
  const [isLoading, setIsLoading] = useState(false);

  // Function that runs when the button is clicked
  const handleRunAI = async () => {
    setIsLoading(true);
    setAiResponse("");

    try {
      // Call your own backend API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: prompt }), // Send the user's prompt
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Get the AI's reply and display it
      const data = await response.json();
      setAiResponse(data.reply);

    } catch (error) {
      console.error("Failed to fetch AI response:", error);
      setAiResponse("Sorry, something went wrong. Please check the logs.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <h1>Welcome to Reunion Assist</h1>
      
      {/* Input box */}
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here..."
        style={{ width: '100%', minHeight: '80px', padding: '0.5rem', marginTop: '1rem' }}
      />
      
      {/* "Run AI" button */}
      <button 
        onClick={handleRunAI} 
        disabled={isLoading || !prompt}
        style={{ marginTop: '0.5rem', padding: '0.75rem 1.5rem', cursor: 'pointer' }}
      >
        {isLoading ? "Thinking..." : "Run AI"}
      </button>

      {/* Area to display the AI response */}
      {aiResponse && (
        <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0', border: '1px solid #ccc', whiteSpace: 'pre-wrap' }}>
          <h2>AI Response:</h2>
          <p>{aiResponse}</p>
        </div>
      )}
    </main>
  );
}
