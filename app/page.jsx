"use client";

import { useState } from 'react';

export default function Home() {
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async () => {
    setIsLoading(true);
    setApiResponse("");

    try {
      const response = await fetch('/api/chat', { method: 'POST' });
      const data = await response.json();
      // Display the entire JSON object from our diagnostic API
      setApiResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setApiResponse("Failed to call the API endpoint.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>API Key Diagnostic Test</h1>
      <button onClick={handleTest} disabled={isLoading}>
        {isLoading ? "Testing..." : "Run Diagnostic Test"}
      </button>

      {apiResponse && (
        <pre style={{ marginTop: '1rem', padding: '1rem', background: '#f0f0f0', border: '1px solid #ccc' }}>
          <code>{apiResponse}</code>
        </pre>
      )}
    </main>
  );
}
