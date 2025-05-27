const axios = require("axios");
const RecipeModel = require("../models/recipe.model");
require("dotenv").config();

const getWeatherBasedRecipes = async (req, res) => {
  try {
    const { lat, lon, fullDetails = true } = req.body;

    if (!lat || !lon) {
      return res
        .status(400)
        .json({ error: "Latitude and longitude are required" });
    }

    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}`
    );

    if (!weatherResponse.data || !weatherResponse.data.main) {
      return res.status(500).json({ error: "Invalid weather data received" });
    }

    const temperatureCelsius = Math.round(
      weatherResponse.data.main.temp - 273.15
    );
    const place = weatherResponse.data.name;
    const weatherDescription = weatherResponse.data.weather[0]?.main || "";

    let season;
    if (temperatureCelsius < 10) {
      season = "winter";
    } else if (temperatureCelsius > 25) {
      season = "summer";
    } else if (temperatureCelsius >= 10 && temperatureCelsius <= 15) {
      season = "autumn";
    } else {
      season = "spring";
    }

    const recipes = await RecipeModel.find({
      $or: [{ season: { $regex: `^${season}$`, $options: "i" } }],
    });

    const recipeData = fullDetails
      ? recipes
      : recipes.map((recipe) => recipe.name);

    res.status(200).json({
      temperature: temperatureCelsius,
      weatherDescription,
      placeName: place,
      season,
      recipes: recipeData,
    });
  } catch (e) {
    console.error("Error fetching weather-based recipes:", e);
    res.status(500).json({ error: e.message });
  }
};

module.exports = { getWeatherBasedRecipes };
