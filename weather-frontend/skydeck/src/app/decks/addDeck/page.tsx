"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ElementRow from "@/app/components/elementRow";

const ElementDetail = () => {
  const [deckName, setDeckName] = useState("");
  const [deckStatus] = useState(true); // Default to active

  const [isSaving, setIsSaving] = useState(false);

  const operatorOptions = ["<", "<=", "=", ">=", ">"];
  const weatherOptions = [
    { weather: "Wind speed", unit: "mph" },
    { weather: "Temperature", unit: "°F" },
    { weather: "Humidity", unit: "%" },
    { weather: "Visibility", unit: "miles" },
    { weather: "Pressure", unit: "hPa" },
    { weather: "Precipitation", unit: "in" },
    { weather: "Cloud cover", unit: "%" },
  ];

  const router = useRouter();

  // Get the user ID from session or context (this is just a placeholder)
  const userId = "3"; // Replace with actual logic to get user ID

  const handleDeleteDeck = async () => {
    try {
      const res = await fetch("/api/deleteDeck", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index }),
      });

      const result = await res.json();

      if (result.success) {
        router.push("/decks");
      } else {
        console.error("Failed to delete deck:", result.message);
      }
    } catch (err) {
      console.error("Error deleting deck:", err);
    }
  };

  const handleSaveDeck = async () => {
    setIsSaving(true);
    try {
      // Call the API route to save the deck
      const res = await fetch("/api/add-deck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deckName,
          deckStatus, // Include deckStatus here
          userId, // Include userId here
        }),
      });

      const result = await res.json();

      if (result.success) {
        console.log("Deck saved successfully!");
        router.push(`/decks`); // Redirect to the saved deck's page using deck_id
      } else {
        console.error("Failed to save deck.");
      }
    } catch (err) {
      console.error("Error saving deck:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="md:p-4">
      {/* Back + delete */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <button
          type="button"
          className="bg-gray-500 w-1/20 min-w-[120px] text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
          onClick={() => router.back()}
        >
          Back
        </button>
        <button
          type="button"
          className="bg-red-500 w-1/20 min-w-[120px] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 disabled:bg-red-300"
          onClick={handleDeleteDeck}
        >
          Delete
        </button>
      </div>

      {/* Element rows */}
      <div className="border border-gray-200 w-full dark:border-gray-700 rounded-lg p-2 md:p-4 space-y-4">
        <h1 className="text-2xl font-semibold w-1/2">
          <input
            type="text"
            maxLength={100}
            value={deckName}
            className="border p-2 w-full rounded-lg dark:bg-gray-800 dark:text-white"
            onChange={(e) => setDeckName(e.target.value)}
          />
        </h1>
      </div>

      {/* Save button */}
      <div className="w-full flex items-end justify-end mt-4">
        <button
          className="bg-blue-500 w-28 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
          onClick={handleSaveDeck}
          disabled={isSaving}
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
  );
};

export default ElementDetail;
