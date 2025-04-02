import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

interface DropdownProps {
  options: string[];
  label: string;
  menuWidth?: string; // Allow menu width customization
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  menuWidth = "w-full",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full h-full">
      <div className="flex items-center justify-center text-center w-full h-full bg-white text-gray-700 font-medium rounded-lg border border-gray-300 shadow-md">
        <button
          onClick={toggleDropdown}
          className="flex-1 px-2 hover:bg-gray-100 transition-all duration-200"
        >
          {selectedOption || label}
        </button>

        <button
          onClick={toggleDropdown}
          className="h-full px-2 bg-gray-200 rounded-r-lg hover:bg-gray-300 transition-all flex items-center justify-center"
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
          className={`absolute mt-2 ${menuWidth} bg-white border border-gray-300 rounded-lg shadow-lg transition-all duration-200`}
        >
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleOptionSelect(option)}
                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-150"
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
