"use client";

import React from "react";
import { useParams } from "next/navigation";
import { TrashIcon } from "@heroicons/react/24/solid";
import Dropdown from "@/app/components/dropdown";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

type Element = {
  id: number;
  name: string;
};

const ElementDetail = () => {
  const { rowIndex } = useParams();

  const index = Number(rowIndex) - 1;

  const [data, setData] = useLocalStorage<Element[]>("elementsData", [
    { id: 1, name: "Hydrogen" },
    { id: 2, name: "Helium" },
    { id: 3, name: "Lithium" },
    { id: 4, name: "Uranium" },
  ]);

  if (!data) {
    return <p>Loading...</p>;
  }

  const handleNameChange = (id: number, newName: string) => {
    setData((prevData) => {
      if (!prevData) return [];

      return prevData.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      );
    });
  };

  if (isNaN(index) || index < 0 || index >= data.length) {
    return <p>Element not found</p>;
  }

  const element = data[index];

  const operatorOptions = ["<", "<=", "=", ">=", ">"];
  const weatherOptions = [
    "Wind speed",
    "Temperature",
    "Humidity",
    "Pressure",
    "Precipitation",
  ];

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${element.name}?`)) {
      const newData = data.filter((item) => item.id !== element.id);
      setData(newData);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-4 flex justify-center md:justify-start dark:bg-black dark:text-purple-50">
          <input
            type="text"
            value={element.name}
            onChange={(e) => handleNameChange(element.id, e.target.value)}
            className="border p-2 rounded-lg"
          />
        </h1>
      </div>

      <div className="border border-gray-200">
        <div className="flex items-center space-x-4 h-[30px] overflow-y-hidden">
          <div className="flex-9/12 border h-full border-black rounded">
            <Dropdown
              label="Weather Conditions"
              options={weatherOptions}
              menuWidth="w-[70px]"
            />
          </div>
          <div className="w-[90px] h-full border border-black rounded">
            <Dropdown
              label="="
              options={operatorOptions}
              menuWidth="w-[50px]"
            />
          </div>
          <input className="flex w-[50px] h-full border border-black rounded px-2" />

          <button
            className="w-[50px] h-full flex justify-center bg-red-400 p-1 text-white rounded hover:bg-red-700 text-center"
            onClick={handleDelete}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="">Add More</div>
      </div>
    </div>
  );
};

export default ElementDetail;
