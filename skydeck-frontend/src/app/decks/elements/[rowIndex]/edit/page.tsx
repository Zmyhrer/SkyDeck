"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";

import decksData from "@/data/decks.json";
import ElementRow from "@/app/components/elementRow";

const ElementDetail = () => {
  const { rowIndex } = useParams();
  const index = Number(rowIndex) - 1;

  const [deckName, setDeckName] = useState(decksData.data[index].deckName);
  const [elements, setElements] = useState(decksData.data[index].elements);
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

  const updateElement = (
    i: number,
    key: "title" | "operator" | "value",
    newValue: string
  ) => {
    setElements((prev) =>
      prev.map((el, idx) => {
        if (idx !== i) return el;

        const updatedEl = {
          ...el,
          [key]: key === "value" ? parseFloat(newValue) : newValue,
        };

        if (key === "title") {
          const match = weatherOptions.find((opt) => opt.weather === newValue);
          if (match) updatedEl.unit = match.unit;
        }

        return updatedEl;
      })
    );
  };

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

  const handleDeleteElement = (indexToDelete: number) => {
    setElements((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  const handleAddElement = () => {
    setElements((prev) => [
      ...prev,
      {
        title: "Temperature",
        operator: "<",
        value: 0,
        arrowUp: false,
        unit: "°F",
      },
    ]);
  };

  const handleSaveDeck = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/updateDeck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          index,
          deckName,
          elements,
        }),
      });

      const result = await res.json();

      if (result.success) {
        console.log("Deck saved successfully!");
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          {elements.map((element, i) => (
            <ElementRow
              key={`element-${i}`}
              element={element}
              index={i}
              weatherOptions={weatherOptions}
              operatorOptions={operatorOptions}
              updateElement={updateElement}
              handleDeleteElement={handleDeleteElement}
            />
          ))}
        </div>
      </div>

      {/* Add More Button */}
      <div className="mt-4">
        <button
          type="button"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200"
          onClick={handleAddElement}
        >
          Add More
        </button>
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
