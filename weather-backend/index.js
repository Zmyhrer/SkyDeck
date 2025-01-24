const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/SkyDeck", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Example route to fetch weather data
app.get("/api/weather", async (req, res) => {
  const { office, gridX, gridY } = req.query;

  try {
    const response = await axios.get(
      `https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast`,
      { headers: { "User-Agent": "SkyDeck (zach.myhrer@gmail.com)" } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
