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
      className={`fixed inset-0 mt-[71px] bg-gray-800 bg-opacity-50 md:bg-opacity-100 md:w-[100px] w-full transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="md:w-[132px] w-full bg-gray-900 text-white h-full p-4">
        <nav>
          <ul>
            <li>
              <Link href="/" className="block py-2 hover:bg-gray-700">
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="block py-2 hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2 hover:bg-gray-700">
                Services
              </Link>
            </li>
            <li>
              <Link href="#" className="block py-2 hover:bg-gray-700">
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
