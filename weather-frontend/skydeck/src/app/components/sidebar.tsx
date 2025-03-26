"use client";

import Link from "next/link";
import React from "react";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

const Sidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={`fixed left-0 top-[72px] h-[calc(100vh-4rem)] bg-gray-800 md:w-[100px] w-full transition-transform transform
    ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 z-4`}
    >
      <div className="md:w-[132px] w-full bg-gray-900 text-white h-full p-4 flex justify-center md:block">
        <nav>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.href}
                  className="block py-2 px-2 hover:bg-gray-700 hover:rounded"
                  onClick={onClose}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
