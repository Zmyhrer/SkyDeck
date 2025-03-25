"use client";

import Link from "next/link";
import React from "react";

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-30 bg-gray-800 md:w-[100px] w-full transition-transform transform
    ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      <div className="md:w-[132px] w-full bg-gray-900 text-white h-full p-4 flex justify-center md:block">
        <nav>
          <ul>
            <li>
              <Link
                href="/"
                className="block py-2 hover:bg-gray-700"
                onClick={onClose}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="block py-2 hover:bg-gray-700"
                onClick={onClose}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 hover:bg-gray-700"
                onClick={onClose}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block py-2 hover:bg-gray-700"
                onClick={onClose}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
