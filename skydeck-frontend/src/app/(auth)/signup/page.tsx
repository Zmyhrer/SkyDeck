"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [unitSystem, setUnitSystem] = useState("US");
  const [role, setRole] = useState("manager");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        unit_system: unitSystem,
        role,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push("/auth/signin"); // Redirect to sign-in page after successful signup
    } else {
      setError(data.error || "Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="unit_system"
              className="block text-sm font-medium text-gray-700"
            >
              Unit System
            </label>
            <select
              id="unit_system"
              name="unit_system"
              value={unitSystem}
              onChange={(e) => setUnitSystem(e.target.value)}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="US">US</option>
              <option value="EU">EU</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            >
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white p-2 rounded-md w-full disabled:bg-blue-300"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/auth/signin"
              className="text-blue-500 hover:text-blue-700"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
