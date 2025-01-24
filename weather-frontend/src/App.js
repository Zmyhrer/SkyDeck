import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/navbar";
import Task_Dashboard from "./components/task_dashboard";

function App() {
  const [userLocation, setUserLocation] = useState({
    latitude: "",
    longitude: "",
  });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude.toFixed(4),
            longitude: position.coords.longitude.toFixed(4),
          });
        },
        (err) => {
          setError(
            "Failed to get your location. Please enable location access."
          );
          console.error("Geolocation error:", err);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  const fetchWeather = async () => {
    if (!userLocation.latitude || !userLocation.longitude) {
      setError("Location not available. Please try again.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:5000/api/weather", {
        params: userLocation,
      });
      setWeather(response.data);
      localStorage.setItem("weather", JSON.stringify(response.data));
    } catch (err) {
      setError("Failed to fetch weather data. Please try again.");
      console.error("Weather fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedWeather = localStorage.getItem("weather");
    if (cachedWeather) {
      setWeather(JSON.parse(cachedWeather));
    }
    getUserLocation();
  }, []);

  return (
    <div className="font-sans text-center">
      <Navbar />
      <h1 className="text-3xl font-bold text-blue-600">SkyDeck</h1>
      <button
        onClick={fetchWeather}
        className="mt-4 px-6 py-2 text-white bg-blue-500 rounded"
      >
        Get My Weather
      </button>

      {/* Display user's location */}
      {userLocation.latitude && userLocation.longitude && (
        <p className="mt-4">
          Your location: Latitude {userLocation.latitude}, Longitude{" "}
          {userLocation.longitude}
        </p>
      )}

      {/* Display loading, errors, or weather data */}
      {loading && <p className="mt-4 text-gray-600">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <Task_Dashboard />
    </div>
  );
}

export default App;
