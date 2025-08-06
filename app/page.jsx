// File: app/page.jsx
"use client"; // This is a browser component

import { useState } from "react";

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // This is the "waiter" sending the order to the "kitchen"
      const res = await fetch("/api/run-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("The request to the AI server failed.");
      }

      const data = await res.json();
      setResult(data.result);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h1>Welcome to Reunion Assist</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
          style={{ width: "100%", padding: "8px" }}
        />
        <button type="submit" disabled={isLoading} style={{ marginTop: "1rem" }}>
          {isLoading ? "Running..." : "Run AI"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>Error: {error}</p>}

      {result && (
        <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #eee" }}>
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </main>
  );
}
