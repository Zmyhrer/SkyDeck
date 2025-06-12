"use client";

import React, { useState } from "react";
import ReturnUnit from "./return_unit";

type Element = {
  title: string;
  value: number;
};

type DeckCardProps = {
  id: string;
  name: string;
  elements: Element[];
  onView: (id: string) => void;
};

const DeckCard: React.FC<DeckCardProps> = ({ id, name, elements, onView }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6 h-full flex flex-col justify-between">
        <div>
          <h2
            className="text-xl font-bold text-gray-800 mb-3 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            {name}
            <span className="ml-2 text-sm text-gray-500">
              {isOpen ? "▲" : "▼"}
            </span>
          </h2>

          {isOpen && (
            <div className="space-y-3">
              {elements.slice(0, 4).map((element, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-600 font-medium">{element.title}</span>
                  <span className="text-gray-800 font-semibold">
                    {element.value} <ReturnUnit weather={element.title} />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          onClick={() => onView(id)}
        >
          View Deck
        </button>
      </div>
    </div>
  );
};

export default DeckCard;
