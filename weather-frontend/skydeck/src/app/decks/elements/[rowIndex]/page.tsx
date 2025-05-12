"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useNavLink } from "@/utils/navigation";
import decksData from "@/data/decks.json";
import ReturnUnit from "@/app/components/return_unit";

const Home: React.FC = () => {
  const { rowIndex } = useParams();
  const index = Number(rowIndex) - 1;
  const deck = decksData.data[index];
  const navLink = useNavLink();

  const handleEdit = () => {
    navLink({ path: `/decks/elements/${rowIndex}/edit` });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex flex-wrap justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{deck.deckName}</h1>
          <button
            className="bg-blue-600 text-white font-semibold rounded-md px-5 py-2 hover:bg-blue-700 transition"
            onClick={handleEdit}
          >
            Edit Deck
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {deck.elements.map((element, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition border border-gray-200"
            >
              <h2 className="text-sm uppercase text-gray-500 mb-2">
                {element.title}
              </h2>
              <div className="flex items-center space-x-2">
                <p className="text-3xl font-bold">
                  {element.operator === "-" ? "-" : ""}
                  {element.value}
                  <span className="text-base text-gray-400 ml-1">
                    <ReturnUnit weather={element.title} />
                  </span>
                </p>
                {element.arrowUp && (
                  <span
                    className={`text-sm font-medium ${
                      element.arrowUp === true
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {element.arrowUp}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
