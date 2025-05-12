"use client";

import { useNavLink } from "@/utils/navigation";
import React from "react";
import dataDecks from "@/data/decks.json";

const Page = () => {
  const navLink = useNavLink();

  const handleViewDeck = (id: string) => {
    navLink({ path: `/decks/elements/${id}` });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Decks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dataDecks.data.map((deck, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {deck.deckName}
              </h2>
              <div className="space-y-3">
                {deck.elements.slice(0, 4).map((element, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-600 font-medium">
                      {element.title}
                    </span>
                    <span className="text-gray-800 font-semibold">
                      {element.value}{" "}
                      {element.unit && (
                        <span className="text-gray-500">{element.unit}</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
              <button
                className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                onClick={() => handleViewDeck((index + 1).toString())}
              >
                View Deck
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
