const RecipeModel = require("../models/recipe.model");
const mongoose = require("mongoose");

const searchRecipes = async (req, res) => {
  try {
    const {
      name,
      ingredients,
      season,
      occasion,
      type,
      mealType,
      time,
      difficulty,
    } = req.body;

    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (season) query.season = season;
    if (occasion) query.occasion = occasion;
    if (type) query.type = type;
    if (mealType) query.mealType = mealType;
    if (time) {
      const [minTime, maxTime] = time.split("-").map(Number);
      if (maxTime) {
        query.time = { $gte: minTime, $lte: maxTime };
      } else {
        query.time = { $gte: minTime };
      }
    }
    if (difficulty) query.difficulty = difficulty;
    if (ingredients && ingredients.length > 0) {
      query.ingredients = {
        $elemMatch: {
          name: {
            $in: ingredients.map((ingredient) => new RegExp(ingredient, "i")),
          },
        },
      };
    }

    const recipes = await RecipeModel.find(query);
    res.status(200).json(recipes);
  } catch (e) {
    res.status(500).json({ error: `${e.message}` });
  }
};

const getRecipeByUserId = async (req, res) => {
  try {
    const { userId } = req.body;
    const recipes = await RecipeModel.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    if (!recipes || recipes.length === 0) {
      return res.status(404).json({ error: "Recipes not found" });
    }
    res.status(200).json(recipes);
  } catch (e) {
    res.status(500).json({ error: `${e.message}` });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.status(200).json(recipe);
  } catch (e) {
    res.status(500).json({ error: `${e.message}` });
  }
};

module.exports = { searchRecipes, getRecipeByUserId, getRecipeById };
