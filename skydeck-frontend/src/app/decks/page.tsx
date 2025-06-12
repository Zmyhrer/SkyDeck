"use client";

import { useNavLink } from "@/utils/navigation";
import React, { useState } from "react";
import dataDecks from "@/data/decks.json";
import PopupLeft from "../components/popup-left";
import DeckCard from "../components/deckCards";


const Page = () => {
  const navLink = useNavLink();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newDeckName, setNewDeckName] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const triggerNotification = () => {
    setShowNotification(true);
  };

  const handleViewDeck = (id: string) => {
    navLink({ path: `/decks/elements/${id}` });
  };

  const handleAddDeck = async () => {
    if (!newDeckName.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:8000/deck/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deck_name: newDeckName, user_id: 1 }),
      });

      const data = await res.json();
      console.log(data.success)

      if (data.success) {
        triggerNotification();
        setNewDeckName(""); // clear input
      } else {
        setError(data.message || "Failed to add deck");
      }
    } catch (err) {
      console.error("Error adding deck:", err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {showNotification && (
        <PopupLeft
          message="Deck added successfully!"
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Decks</h1>
      </div>

      {/* Add Deck Input */}
      <div className="flex w-full bg-white border border-black mb-6 rounded-2xl overflow-hidden">
        <input
          className="w-full text-left outline-none p-3"
          placeholder='Running Weather'
          value={newDeckName}
          onChange={(e) => setNewDeckName(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-6 disabled:bg-blue-300"
          onClick={handleAddDeck}
          disabled={loading || !newDeckName.trim()}
        >
          {loading ? "Adding..." : "Add Deck"}
        </button>
      </div>

      {/* Show error if any */}
      {error && (
        <div className="text-red-600 font-semibold mb-4">{error}</div>
      )}

      {/* Decks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataDecks.data.map((deck, index) => (
            <DeckCard
              key={index}
              id={(index + 1).toString()}
              name={deck.deckName}
              elements={deck.elements}
              onView={handleViewDeck}
            />
          ))}
        </div>

    </div>
  );
};

export default Page;
