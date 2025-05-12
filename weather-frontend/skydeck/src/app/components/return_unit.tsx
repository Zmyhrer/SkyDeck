"use client";

import React, { useState } from "react";

type UnitProps = {
  weather: string;
};

const ReturnUnit: React.FC<UnitProps> = ({ weather }) => {
  const weatherOptions = [
    { weather: "Wind speed", US: "mph", EU: "km/h" },
    { weather: "Temperature", US: "°F", EU: "°C" },
    { weather: "Humidity", US: "%", EU: "%" },
    { weather: "Visibility", US: "miles", EU: "km" },
    { weather: "Pressure", US: "hPa", EU: "hPa" },
    { weather: "Precipitation", US: "in", EU: "mm" },
    { weather: "Cloud cover", US: "%", EU: "%" },
    { weather: "UV index", US: "index", EU: "index" },
  ];

  const [unitSystem] = useState<"US" | "EU">("US");

  // Correcting the assignment logic using a ternary operator
  const weatherUnit =
    unitSystem === "US"
      ? weatherOptions.find(
          (option) => option.weather.toLowerCase() === weather.toLowerCase()
        )?.US
      : weatherOptions.find(
          (option) => option.weather.toLowerCase() === weather.toLowerCase()
        )?.EU || "N/A";

  return <>{weatherUnit}</>;
};

export default ReturnUnit;
