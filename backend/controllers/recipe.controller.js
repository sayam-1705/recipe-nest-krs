const RecipeModel = require("../models/recipe.model");
const { getNutritionInfo } = require("./nutrition.controller");

const createRecipe = async (req, res) => {
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
      servings,
      instructions,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const imageBuffer = req.file.buffer;
    const image = imageBuffer.toString("base64");

    const parsedIngredients = JSON.parse(ingredients);
    const parsedInstructions = JSON.parse(instructions);

    const recipeName = await RecipeModel.findOne({ name, userId: req.user.id });
    if (recipeName) {
      return res
        .status(400)
        .json({ error: "Recipe already exists for this user" });
    }

    let totalCalories = 0;
    const ingredientsWithNutrition = [];

    for (const ingredient of parsedIngredients) {
      const { name, quantity } = ingredient;
      try {
        const nutritionInfo = await getNutritionInfo([`${quantity} ${name}`]);
        const calories = nutritionInfo.calories || 0;
        totalCalories += calories;
        ingredientsWithNutrition.push({
          ...ingredient,
          nutrition: { calories },
        });
      } catch (error) {
        console.error(`Nutrition data not found for ingredient: ${name}`);
        ingredientsWithNutrition.push({
          ...ingredient,
          nutrition: { calories: 0 },
        });
      }
    }

    const nutritionPerServing =
      servings > 0 ? (totalCalories / servings).toFixed(2) : "0";

    const recipe = new RecipeModel({
      name,
      image,
      ingredients: ingredientsWithNutrition,
      season,
      occasion,
      type,
      mealType,
      time,
      difficulty,
      servings,
      nutritionPerServing,
      instructions: parsedInstructions,
      userId: req.user.id,
    });

    await recipe.save();
    res.status(201).json({ recipe });
  } catch (e) {
    console.error("Error creating recipe:", e);
    res.status(500).json({ error: e.message });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find();
    res.status(200).json({ recipes });
  } catch (e) {
    console.error("Error fetching recipes:", e);
    res.status(500).json({ error: e.message });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const recipe = await RecipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    if (recipe.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this recipe" });
    }

    Object.keys(updates).forEach((key) => {
      if (key === "image" && typeof updates[key] !== "string") {
        updates[key] = updates[key].toString();
      }
      recipe[key] = updates[key];
    });

    await recipe.save();
    res.status(200).json({ message: "Recipe updated successfully", recipe });
  } catch (e) {
    console.error("Error updating recipe:", e);
    res.status(500).json({ error: e.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await RecipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    if (recipe.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this recipe" });
    }

    await RecipeModel.deleteOne({ _id: id });
    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (e) {
    console.error("Error deleting recipe:", e);
    res.status(500).json({ error: e.message });
  }
};

module.exports = { createRecipe, getRecipes, updateRecipe, deleteRecipe };
