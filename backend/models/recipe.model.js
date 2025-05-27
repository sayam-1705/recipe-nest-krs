const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      nutrition: {
        calories: {
          type: Number,
          default: 0,
        },
      },
    },
  ],
  season: {
    type: String,
    required: true,
  },
  occasion: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  mealType: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  nutritionPerServing: {
    type: String,
  },
  instructions: {
    type: [String],
    required: true,
  },
});

const RecipeModel = mongoose.model("Recipe", RecipeSchema);

module.exports = RecipeModel;
