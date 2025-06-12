"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Header = ({ onSidebarToggle }: { onSidebarToggle: () => void }) => {
  const [user, setUser] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Don't show header on auth pages
  const hideHeader = ["/login", "/signup"].includes(pathname);
  if (hideHeader) return null;

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 z-50 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Sidebar toggle button */}
        <button
          onClick={onSidebarToggle}
          className="text-white md:hidden p-2 rounded-md hover:bg-gray-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <Link
          href="/dashboard"
          className="text-xl font-bold md:text-2xl md:ml-4 hover:text-gray-300 transition-colors"
        >
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            SkyDeck
          </span>
        </Link>

        {/* Right section */}
        {user ? (
          <div className="flex items-center space-x-2 ml-auto">
            <Link
              href="/profile"
              className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded-md transition-colors"
              aria-label="User profile"
            >
              <div className="relative w-10 h-10">
                <Image
                  src={"/avatar.avif"}
                  alt={`${user}'s profile`}
                  className="rounded-full object-cover"
                  fill
                  sizes="40px"
                  priority
                />
              </div>
              <span className="text-white hidden md:block font-medium">
                {user}
              </span>
            </Link>
          </div>
        ) : (
          <div className="flex space-x-4 ml-auto">
            <Link
              href="/login"
              className="px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
