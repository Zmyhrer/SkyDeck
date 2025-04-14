// app/components/dropdown.tsx
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

interface DropdownProps {
  options: string[];
  label: string;
  value?: string; // Make value optional
  onChange: (value: string) => void;
  menuWidth?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  label,
  value = "", // Default to empty string
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
      <div className="flex items-stretch w-full h-full bg-white text-gray-700 font-medium rounded-lg border border-gray-300 shadow-md overflow-hidden">
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex-1 px-4 py-2 hover:bg-gray-100 transition-all duration-200 text-left"
        >
          {value || label}
        </button>
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex items-center justify-center px-2 bg-gray-200 hover:bg-gray-300 transition-all border-l border-gray-300"
        >
          {isOpen ? (
            <ChevronUpIcon className="h-5 w-5 text-gray-600" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className={`absolute mt-1 z-10 ${menuWidth} bg-white border border-gray-300 rounded-lg shadow-lg`}
        >
          <ul className="py-1 max-h-60 overflow-auto">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionSelect(option)}
                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
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
