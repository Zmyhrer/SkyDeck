const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const NWS_BASE_URL = process.env.NWS_BASE_URL || "https://api.weather.gov";
const NWS_USER_AGENT =
  process.env.NWS_USER_AGENT || "SkyDeck (zach.myhrer@gmail.com)";

// API Endpoint to fetch weather data
app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query; // Expect latitude and longitude from the request

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  try {
    // Fetch weather data from NWS API
    const response = await axios.get(`${NWS_BASE_URL}/points/${lat},${lon}`, {
      headers: {
        "User-Agent": NWS_USER_AGENT,
      },
    });

    // Extract forecast URL from the NWS response
    const forecastUrl = response.data.properties.forecast;

    // Fetch the actual weather forecast
    const forecastResponse = await axios.get(forecastUrl, {
      headers: {
        "User-Agent": NWS_USER_AGENT,
      },
    });

    res.json(forecastResponse.data); // Send the forecast data to the client
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
