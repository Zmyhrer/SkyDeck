"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/solid";
import Dropdown from "@/app/components/dropdown";
import decksData from "@/data/decks.json";

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

        const updatedEl = { ...el, [key]: newValue };

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
      {/* Deck title + delete */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-semibold w-max-4">
          <input
            type="text"
            value={deckName}
            className="border p-2 w-full rounded-lg dark:bg-gray-800 dark:text-white"
            onChange={(e) => setDeckName(e.target.value)}
          />
        </h1>
        <button
          type="button"
          className="bg-red-500 w-1/5 min-w-[120px] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 disabled:bg-red-300"
          onClick={handleDeleteDeck}
        >
          Delete
        </button>
      </div>

      {/* Element rows */}
      <div className="border border-gray-200 w-full dark:border-gray-700 rounded-lg p-2 md:p-4 space-y-4">
        {elements.map((element, i) => (
          <div key={`element-${i}`} className="flex flex-col md:flex-row gap-2">
            {/* Weather dropdown */}
            <div className="w-full md:w-1/3">
              <Dropdown
                label={element.title}
                options={weatherOptions.map((opt) => opt.weather)}
                onChange={(value: string) => updateElement(i, "title", value)}
                value={element.title}
              />
            </div>

            {/* Operator, value, unit, delete */}
            <div className="flex flex-row flex-wrap md:flex-nowrap gap-2 items-center md:w-2/3">
              <div className="w-[90px]">
                <Dropdown
                  label="Operator"
                  options={operatorOptions}
                  value={element.operator}
                  onChange={(value: string) =>
                    updateElement(i, "operator", value)
                  }
                />
              </div>

              <input
                className="w-[90px] h-10 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-800"
                value={element.value}
                type="number"
                inputMode="decimal"
                onChange={(e) => updateElement(i, "value", e.target.value)}
              />

              <p className="w-[50px] text-center">{element.unit || ""}</p>

              <button
                type="button"
                className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
                onClick={() => handleDeleteElement(i)}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
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
