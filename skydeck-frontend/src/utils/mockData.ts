export const mockWeatherData = {
  decks: [
    {
      id: "1",
      name: "NYC Daily Weather",
      location: "New York, NY",
      date: "Nov 15, 2023",
      time: "10:30 AM",
      lastUpdated: "5 min ago",
      elements: [
        { type: "temperature", name: "Temperature", value: "54", unit: "°F" },
        {
          type: "precipitation",
          name: "Precipitation",
          value: "20",
          unit: "%",
        },
        { type: "wind", name: "Wind", value: "12", unit: "mph" },
        { type: "humidity", name: "Humidity", value: "65", unit: "%" },
      ],
    },
    {
      id: "2",
      name: "Weekend Forecast",
      location: "New York, NY",
      date: "Nov 18, 2023",
      time: "12:00 PM",
      lastUpdated: "1 hour ago",
      elements: [
        { type: "temperature", name: "Temperature", value: "62", unit: "°F" },
        {
          type: "precipitation",
          name: "Precipitation",
          value: "10",
          unit: "%",
        },
        { type: "uv", name: "UV Index", value: "5", unit: "" },
        { type: "cloud", name: "Cloud Cover", value: "30", unit: "%" },
      ],
    },
    {
      id: "3",
      name: "Outdoor Activity Check",
      location: "Central Park, NY",
      date: "Nov 15, 2023",
      time: "11:00 AM",
      lastUpdated: "Just now",
      elements: [
        { type: "temperature", name: "Temperature", value: "55", unit: "°F" },
        { type: "rain", name: "Rain Chance", value: "15", unit: "%" },
        { type: "wind", name: "Wind", value: "8", unit: "mph" },
        { type: "uv", name: "UV Index", value: "4", unit: "" },
      ],
    },
  ],
};
