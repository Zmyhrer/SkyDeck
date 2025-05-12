"use client";
import React, { useState } from "react";

const Home = () => {
  // State for form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for feedback message
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null); // Reset message before making the request

    try {
      // Call the Next.js API route to add the user
      const response = await fetch("/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
          unit_system: "US",
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("User successfully added to the database!");
      } else {
        setMessage(data.message || "Failed to add user. Please try again.");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Error adding user. Please try again.");
    } finally {
      setIsLoading(false);
    }

    // Reset form fields
    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4 flex justify-center">Home</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Adding User..." : "Add User"}
          </button>
        </div>
      </form>

      {/* Feedback Message */}
      {message && (
        <div
          className={`mt-4 p-4 text-center rounded-md ${
            message.includes("successfully")
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Home;
