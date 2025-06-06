"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // to handle redirection

const ProfilePage: React.FC = () => {
  const [name] = useState<string>("John Doe");
  const [unitSystem, setUnitSystem] = useState<"US" | "EU">("US");
  const [userId] = useState("");

  // State for feedback message
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter(); // Next.js hook for navigation

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null); // Reset message before making the request

    try {
      // Call the Next.js API route to update the user's unit system
      const response = await fetch("/api/update-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, unitSystem }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("User successfully updated!");
      } else {
        setMessage(data.message || "Failed to update user. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Error updating user. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout functionality
  const handleLogout = () => {
    // Clear authentication token (from cookies or localStorage)
    document.cookie = "auth_token=; Max-Age=0"; // Expire the cookie

    // Redirect to login page
    router.push("/login"); // Or to the homepage or wherever the user should go
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Profile Page
      </h2>

      {/* Feedback message */}
      {message && (
        <div
          className={`mb-4 p-2 text-center ${
            isLoading ? "text-blue-600" : "text-green-600"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Name:
          </label>
          <span className="text-gray-600">{name}</span>
        </div>

        <div className="mb-6">
          <label
            htmlFor="unit-system"
            className="block text-gray-700 font-medium"
          >
            Unit System:
          </label>
          <select
            id="unit-system"
            value={unitSystem}
            onChange={(e) => setUnitSystem(e.target.value as "US" | "EU")}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="US">US</option>
            <option value="EU">EU</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="w-full mt-4 p-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfilePage;
