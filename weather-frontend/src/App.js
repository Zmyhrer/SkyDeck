import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState({ office: "", gridX: "", gridY: "" }); // User input
  const [weather, setWeather] = useState(null); // Weather data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error handling

  // Fetch weather data from the backend
  const fetchWeather = async () => {
    if (!query.office || !query.gridX || !query.gridY) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:5000/api/weather", {
        params: query,
      });
      setWeather(response.data); // Save weather data to state
      localStorage.setItem("weather", JSON.stringify(response.data)); // Optional: Cache data in local storage
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load cached weather data (if available) on app start
  useEffect(() => {
    const cachedWeather = localStorage.getItem("weather");
    if (cachedWeather) {
      setWeather(JSON.parse(cachedWeather));
    }
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>SkyDeck</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Office (e.g., SEW)"
          value={query.office}
          onChange={(e) => setQuery({ ...query, office: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="GridX (e.g., 120)"
          value={query.gridX}
          onChange={(e) => setQuery({ ...query, gridX: e.target.value })}
          style={{ marginRight: "10px" }}
        />
        <input
          type="text"
          placeholder="GridY (e.g., 70)"
          value={query.gridY}
          onChange={(e) => setQuery({ ...query, gridY: e.target.value })}
        />
        <button
          onClick={fetchWeather}
          style={{
            marginLeft: "10px",
            padding: "5px 15px",
            cursor: "pointer",
            backgroundColor: "#007BFF",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Get Weather
        </button>
      </div>

      {/* Display loading, errors, or weather data */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "left",
            maxWidth: "600px",
            margin: "auto",
          }}
        >
          <h2>Weather Forecast</h2>
          {weather.properties.periods.map((period, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>{period.name}</h3>
              <p>
                <strong>Temperature:</strong> {period.temperature}°
                {period.temperatureUnit}
              </p>
              <p>
                <strong>Forecast:</strong> {period.detailedForecast}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
