"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/solid";
import Dropdown from "@/app/components/dropdown";
import decksData from "@/data/decks.json";

const ElementDetail = () => {
  const { rowIndex } = useParams();
  const index = Number(rowIndex) - 1;

  const [deckName, setDeckName] = useState(decksData.data[index].deckName);
  const [elements, setElements] = useState(decksData.data[index].elements);

  const operatorOptions = ["<", "<=", "=", ">=", ">"];
  const weatherOptions = [
    { title: "Wind speed", unit: "mph" },
    { title: "Temperature", unit: "°F" },
    { title: "Humidity", unit: "%" },
    { title: "Pressure", unit: "hPa" },
    { title: "Precipitation", unit: "in" },
  ];

  const updateElement = (
    i: number,
    key: "title" | "operator" | "value",
    newValue: string | number
  ) => {
    setElements((prev) =>
      prev.map((el, idx) => (idx === i ? { ...el, [key]: newValue } : el))
    );
  };

  const handleDeleteDeck = () => {
    console.log("Deleted Deck");
  };

  const handleDeleteElement = (indexToDelete: number) => {
    setElements((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  const handleSaveDeck = async () => {
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
    }
  };

  return (
    <div className="p-4">
      {/* Deck title + delete */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">
          <input
            type="text"
            value={deckName}
            className="border p-2 rounded-lg dark:bg-gray-800 dark:text-white"
            onChange={(e) => setDeckName(e.target.value)}
          />
        </h1>
        <button
          className="bg-red-500 w-20 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200 disabled:bg-red-300"
          onClick={handleDeleteDeck}
        >
          Delete
        </button>
      </div>

      {/* Element rows */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
        {elements.map((element, i) => {
          const selectedWeather = weatherOptions.find(
            (opt) => opt.title === element.title
          );
          const unit = selectedWeather ? selectedWeather.unit : "";

          return (
            <div key={`element-${i}`} className="flex items-center gap-3">
              {/* Weather dropdown */}
              <div className="flex-1 h-10">
                <Dropdown
                  label={element.title}
                  options={weatherOptions.map((opt) => opt.title)}
                  value={element.title}
                  onChange={(value: string) => updateElement(i, "title", value)}
                />
              </div>

              {/* Operator dropdown */}
              <div className="w-24 h-10">
                <Dropdown
                  label="Operator"
                  options={operatorOptions}
                  value={element.operator}
                  onChange={(value: string) =>
                    updateElement(i, "operator", value)
                  }
                />
              </div>

              {/* Numeric input */}
              <input
                className="w-20 h-10 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 dark:bg-gray-800"
                value={element.value}
                type="number"
                onChange={(e) =>
                  updateElement(i, "value", Number(e.target.value))
                }
              />

              {/* Unit display */}
              <p className="w-10 text-center">{unit}</p>

              {/* Delete button */}
              <button
                className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
                onClick={() => handleDeleteElement(i)}
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Save button */}
      <div className="w-full flex items-end justify-end mt-4">
        <button
          className="bg-blue-500 w-20 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
          onClick={handleSaveDeck}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ElementDetail;
