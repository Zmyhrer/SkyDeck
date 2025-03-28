"use client";

import React from "react";
import Table from "@/app/components/table"; // Import Table component for wrapping

const page = () => {
  const headers: string[] = [
    "Deck Name",
    "Boolean",
    "E1",
    "E2",
    "E3",
    "E4",
    "E5",
    "E6",
    "E7",
    "E8",
    "E9",
    "E10",
  ];

  const data = [
    {
      "Deck Name": "Deck 1",
      Boolean: true,
      E1: { title: "Temperature", value: 100, arrowUp: true },
      E2: { title: "Pressure", value: 200, arrowUp: false },
      E3: { title: "Humidity", value: 300, arrowUp: true },
      E4: { title: "Wind Speed", value: 400, arrowUp: false },
      E5: { title: "Precipitation", value: 500, arrowUp: true },
      E6: { title: "Visibility", value: 600, arrowUp: false },
      E7: { title: "UV Index", value: 700, arrowUp: true },
      E8: { title: "Solar Radiation", value: 800, arrowUp: false },
      E9: { title: "Temperature", value: 900, arrowUp: true },
      E10: { title: "Pressure", value: 1000, arrowUp: false },
    },
    {
      "Deck Name": "Deck 2",
      Boolean: false,
      E1: { title: "Temperature", value: 150, arrowUp: false },
      E2: { title: "Pressure", value: 250, arrowUp: true },
      E3: { title: "Humidity", value: 350, arrowUp: false },
      E4: { title: "Wind Speed", value: 450, arrowUp: true },
      E5: { title: "Precipitation", value: 550, arrowUp: false },
      E6: { title: "Visibility", value: 650, arrowUp: true },
      E7: { title: "UV Index", value: 750, arrowUp: false },
      E8: { title: "Solar Radiation", value: 850, arrowUp: true },
      E9: { title: "Temperature", value: 950, arrowUp: false },
      E10: { title: "Pressure", value: 1050, arrowUp: true },
    },
    {
      "Deck Name": "Is it nice out?",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
    {
      "Deck Name": "Running weather",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrowUp: true },
      E2: { title: "Pressure", value: 300, arrowUp: false },
      E3: { title: "Humidity", value: 400, arrowUp: true },
      E4: { title: "Wind Speed", value: 500, arrowUp: false },
      E5: { title: "Precipitation", value: 600, arrowUp: true },
      E6: { title: "Visibility", value: 700, arrowUp: false },
      E7: { title: "UV Index", value: 800, arrowUp: true },
      E8: { title: "Solar Radiation", value: 900, arrowUp: false },
      E9: { title: "Temperature", value: 1000, arrowUp: true },
      E10: { title: "Pressure", value: 1100, arrowUp: false },
    },
  ];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e); // Logs the event object with all its details
    alert("Button clicked");
  };

  return (
    <div className="">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold mb-4 flex justify-center md:justify-start  dark:bg-black dark:text-purple-50 ">
          Table
        </h1>
        <div className="">
          <ul className="flex flex-row justify-between items">
            <button
              className="bg-gray-800 text-white text-center rounded px-2 py-1 w-[70px]"
              onClick={handleClick}
            >
              Current
            </button>
            <button
              className="ml-[10px] bg-gray-800 text-white text-center rounded px-2 py-1 w-[70px]"
              onClick={handleClick}
            >
              Hourly
            </button>
            <button
              className="ml-[10px] bg-gray-800 text-white text-center rounded px-2 py-1 w-[70px]"
              onClick={handleClick}
            >
              Daily
            </button>
          </ul>
        </div>
      </div>

      <div className="">
        <Table headers={headers} data={data} />
      </div>
    </div>
  );
};

export default page;
