"use client";

import Link from "next/link";
import React from "react";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Decks",
    href: "/decks",
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
  className={`
    bg-gray-900 text-white
    md:relative fixed top-auto left-0
    md:w-[132px] w-full
    md:h-auto min-h-screen
    transition-transform transform
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
    z-40
  `}
>
  <div className="md:w-[132px] w-full h-full p-4 flex justify-center text-center md:text-left">
    <nav>
      <ul>
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="block py-2 px-2 hover:bg-gray-800 hover:rounded"
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
