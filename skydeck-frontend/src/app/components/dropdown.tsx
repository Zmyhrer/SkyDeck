"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

interface DropdownProps {
  options: string[];
  label: string;
  value?: string;
  onChange: (value: string) => void;
  menuWidth?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  label,
  value = "",
  onChange,
  menuWidth = "w-full",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full h-full">
      <div className="flex items-stretch w-full h-full bg-white text-gray-700 font-medium rounded-lg border border-gray-300 shadow-md overflow-hidden text-sm sm:text-base">
        {/* Label button - grows and truncates */}
        <button
          type="button"
          onClick={toggleDropdown}
          className="w-full px-3 py-1 sm:px-4 sm:py-2 text-left hover:bg-gray-100 transition-all duration-200 truncate"
        >
          {value || label}
        </button>

        {/* Chevron button - fixed width */}
        <button
          type="button"
          onClick={toggleDropdown}
          className=" w-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-all border-l border-gray-300"
        >
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={`absolute mt-1 z-10 ${menuWidth} max-w-full bg-white border border-gray-300 rounded-lg shadow-lg`}
        >
          <ul className="py-1 max-h-60 overflow-auto text-sm sm:text-base">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionSelect(option)}
                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 truncate"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
