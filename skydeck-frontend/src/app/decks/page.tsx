"use client";

import React, { useState } from "react";
import dataDecks from "@/data/decks.json";
import { useNavLink } from "@/utils/navigation";
import DeckCard from "../components/deckCards";
import PopupLeft from "../components/popup-left";

const Page = () => {
  const navLink = useNavLink();

  const [newDeckName, setNewDeckName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleViewDeck = (id: string) => {
    navLink({ path: `/decks/elements/${id}` });
  };

  const triggerNotification = () => {
    setShowNotification(true);
  };

  const handleAddDeck = async () => {
    if (!newDeckName.trim()) return;

    setLoading(true);
    setError("");

    console.log("Sending JSON:", JSON.stringify({ deck_name: newDeckName, user_id: 1 }));


    try {
      const res = await fetch("http://127.0.0.1:8000/deck/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deck_name: newDeckName, user_id: 1 }),
      });

      const data = await res.json();

      if (data.success) {
        triggerNotification();
        setNewDeckName("");
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

  // 👇 Your return block starts here
  return (
    <div className="w-full">
      {showNotification && (
        <PopupLeft
          message="Deck added successfully!"
          onClose={() => setShowNotification(false)}
        />
      )}

      <div className="flex items-center justify-center md:justify-start mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Your Decks</h1>
      </div>

      <div className="flex w-full bg-white border border-black mb-6 rounded-2xl overflow-x-hidden">
        <input
          className="w-full text-left outline-none p-3"
          placeholder="Running Weather"
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

      {error && (
        <div className="text-red-600 font-semibold mb-4">{error}</div>
      )}

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
