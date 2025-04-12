import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv"


// const cors = require('cors');
// require('dotenv').config();

dotenv.config();


const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/weather', async (req, res) => {
  const { city } = req.query;

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});