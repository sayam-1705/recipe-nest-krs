const axios = require("axios");
require("dotenv").config();

const getNutritionInfo = async (ingredients) => {
  try {
    const ingredientQuery = ingredients.join(" ");

    const response = await axios.get(
      `https://api.edamam.com/api/nutrition-data`,
      {
        params: {
          app_id: process.env.EDAMAM_APP_ID,
          app_key: process.env.EDAMAM_API_KEY,
          ingr: ingredientQuery,
        },
      }
    );

    if (!response.data || !response.data.totalNutrients) {
      throw new Error("Invalid data received from Nutrition API");
    }

    const { calories, totalNutrients } = response.data;

    return {
      calories,
      nutrients: totalNutrients,
    };
  } catch (e) {
    console.error("Error fetching nutrition info:", e);
    throw new Error("Error fetching nutrition info");
  }
};

module.exports = { getNutritionInfo };
