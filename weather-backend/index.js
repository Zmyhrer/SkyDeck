const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Route to fetch weather forecast data
app.get("/api/weather", async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and longitude are required" });
  }

  try {
    // Step 1: Get grid information from the NWS API
    const pointsResponse = await axios.get(
      `https://api.weather.gov/points/${latitude},${longitude}`,
      { headers: { "User-Agent": "SkyDeck (zach.myhrer@gmail.com)" } }
    );

    const forecastUrl = pointsResponse.data.properties.forecast;

    // Step 2: Fetch the actual weather forecast using the forecast URL
    const forecastResponse = await axios.get(forecastUrl, {
      headers: { "User-Agent": "SkyDeck (zach.myhrer@gmail.com)" },
    });

    // Return the forecast data to the client
    res.json(forecastResponse.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
