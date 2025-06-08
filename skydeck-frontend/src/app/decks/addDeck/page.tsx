"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ElementDetail = () => {
  const [deckName, setDeckName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSaveDeck = async () => {
    if (!deckName.trim()) {
      setMessage("Deck name cannot be empty");
      return;
    }

    setIsSaving(true);
    setMessage(null);

    try {
      const res = await fetch("/api/add-deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deck_name: deckName,
        }),
      });

      const result = await res.json();

      if (result.success) {
        setMessage("Deck created successfully!");
        setTimeout(() => router.push("/decks"), 1500); // Redirect after success message
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

  return (
    <div className="md:p-4">
      <div className="flex flex-row justify-between items-center mb-4 gap-4">
        {/* Back button */}
        <div className="flex justify-center items-center gap-4">
          <button
            type="button"
            className="bg-gray-500 w-1/20 min-w-[120px] text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
            onClick={() => router.back()}
          >
            Back
          </button>
        </div>
        {/* Save button */}
        <div className=" flex items-center justify-center">
          <button
            className="bg-blue-500 w-28 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
            onClick={handleSaveDeck}
            disabled={isSaving || !deckName.trim()}
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
      </div>

      {/* Message display */}
      {message && (
        <div
          className={`mb-4 p-4 rounded-lg ${
            message.includes("successfully")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      {/* Deck name input */}
      <div className="border border-gray-200 w-full dark:border-gray-700 rounded-lg p-2 md:p-4 space-y-4">
        <h1 className="text-2xl font-semibold w-1/2">
          <input
            type="text"
            maxLength={100}
            value={deckName}
            placeholder="Enter deck name"
            className="border p-2 w-full rounded-lg dark:bg-gray-800 dark:text-white"
            onChange={(e) => setDeckName(e.target.value)}
          />
        </h1>
      </div>
    </div>
  );
};

export default ElementDetail;
