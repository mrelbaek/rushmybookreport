"use client";

import { useState } from "react";

export default function Form() {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [level, setLevel] = useState("");
  const [length, setLength] = useState(500);
  const [rush, setRush] = useState(false);
  const [sampleText, setSampleText] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportText, setReportText] = useState(""); // <-- NEW

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookTitle,
        author,
        level,
        length,
        rush,
        sampleText,
        email,
      }),
    });

    const data = await res.json();

    if (res.ok && data.report) {
      setReportText(data.report);  // <--- Store the generated report in state
    } else {
      alert("Something went wrong. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order Your Book Report</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Book Title"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="text"
          placeholder="Your Grade Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        <input
          type="number"
          placeholder="Desired Length (Words)"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full p-2 mb-4 border rounded"
        />

        <textarea
          placeholder="Paste a sample of your writing (optional)"
          value={sampleText}
          onChange={(e) => setSampleText(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={rush}
            onChange={(e) => setRush(e.target.checked)}
            className="mr-2"
          />
          <label>Rush Delivery (1 Hour)</label>
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Rush My Report"}
        </button>
      </form>

      {reportText && (
        <div className="mt-8 p-4 border rounded bg-gray-50">
          <h3 className="text-xl font-bold mb-2">Generated Report:</h3>
          <p>{reportText}</p>
        </div>
      )}
    </div>
  );
}
