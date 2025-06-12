"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ElementDetail = () => {
  const [deckName, setDeckName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSaveDeck = async () => {
    const trimmedDeckName = deckName.trim();
    if (!trimmedDeckName) {
      setMessage("Deck name cannot be empty");
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/deck/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deck_name: trimmedDeckName, user_id: 1 }),
      });

      const result = await res.json();

      if (result.success) {
        setMessage("Deck created successfully!");
        setTimeout(() => router.push("/decks"), 1500); // Redirect after delay
      } else {
        setMessage(result.message || "Failed to create deck");
      }
    } catch (err) {
      setMessage("Error creating deck. Please try again.");
      console.error("Error saving deck:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const isSaveDisabled = isSaving || !deckName.trim();

  return (
    <div className="md:p-4">
      <div className="flex justify-between items-center mb-4 gap-4">
        {/* Back button */}
        <button
          type="button"
          className="bg-gray-500 min-w-[120px] text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
          onClick={() => router.back()}
        >
          Back
        </button>

        {/* Save button */}
        <button
          className="bg-blue-500 w-28 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
          onClick={handleSaveDeck}
          disabled={isSaveDisabled}
        >
          {isSaving ? (
            <div className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Saving...
            </div>
          ) : (
            "Save"
          )}
        </button>
      </div>

      {/* Message display */}
      {message && (
        <div
          role="alert"
          aria-live="assertive"
          className={`mb-4 p-4 rounded-lg ${
            message.toLowerCase().includes("successfully")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      {/* Deck name input */}
      <div className="border border-gray-200 w-full dark:border-gray-700 rounded-lg p-2 md:p-4 space-y-4">
        <input
          type="text"
          maxLength={100}
          value={deckName}
          placeholder="Enter deck name"
          className="border p-2 w-full rounded-lg dark:bg-gray-800 dark:text-white"
          onChange={(e) => setDeckName(e.target.value)}
          aria-label="Deck name"
        />
      </div>
    </div>
  );
};

export default ElementDetail;
