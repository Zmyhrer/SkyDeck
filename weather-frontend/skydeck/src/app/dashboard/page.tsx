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
      E1: { title: "Temperature", value: 100, arrow: true },
      E2: { title: "Pressure", value: 200, arrow: false },
      E3: { title: "Humidity", value: 300, arrow: true },
      E4: { title: "Wind Speed", value: 400, arrow: false },
      E5: { title: "Precipitation", value: 500, arrow: true },
      E6: { title: "Visibility", value: 600, arrow: false },
      E7: { title: "UV Index", value: 700, arrow: true },
      E8: { title: "Solar Radiation", value: 800, arrow: false },
      E9: { title: "Temperature", value: 900, arrow: true },
      E10: { title: "Pressure", value: 1000, arrow: false },
    },
    {
      "Deck Name": "Deck 2",
      Boolean: false,
      E1: { title: "Temperature", value: 150, arrow: false },
      E2: { title: "Pressure", value: 250, arrow: true },
      E3: { title: "Humidity", value: 350, arrow: false },
      E4: { title: "Wind Speed", value: 450, arrow: true },
      E5: { title: "Precipitation", value: 550, arrow: false },
      E6: { title: "Visibility", value: 650, arrow: true },
      E7: { title: "UV Index", value: 750, arrow: false },
      E8: { title: "Solar Radiation", value: 850, arrow: true },
      E9: { title: "Temperature", value: 950, arrow: false },
      E10: { title: "Pressure", value: 1050, arrow: true },
    },
    {
      "Deck Name": "Is it nice out?",
      Boolean: true,
      E1: { title: "Temperature", value: 200, arrow: true },
      E2: { title: "Pressure", value: 300, arrow: false },
      E3: { title: "Humidity", value: 400, arrow: true },
      E4: { title: "Wind Speed", value: 500, arrow: false },
      E5: { title: "Precipitation", value: 600, arrow: true },
      E6: { title: "Visibility", value: 700, arrow: false },
      E7: { title: "UV Index", value: 800, arrow: true },
      E8: { title: "Solar Radiation", value: 900, arrow: false },
      E9: { title: "Temperature", value: 1000, arrow: true },
      E10: { title: "Pressure", value: 1100, arrow: false },
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 flex justify-center md:justify-start">
        Dashboard
      </h1>

      <div className="">
        <Table headers={headers} data={data} />
      </div>
    </div>
  );
};

export default page;
