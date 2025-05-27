const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe.controller");
const searchController = require("../controllers/search.controller");
const weatherController = require("../controllers/weather.controller");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

router.post(
  "/create-recipe",
  auth,
  upload.single("image"),
  recipeController.createRecipe
);
router.post("/search", searchController.searchRecipes);
router.put("/update-recipe/:id", auth, recipeController.updateRecipe);
router.delete("/delete-recipe/:id", auth, recipeController.deleteRecipe);
router.post("/weather-suggestions", weatherController.getWeatherBasedRecipes);
router.post("/get-recipe-by-userId", auth, searchController.getRecipeByUserId);
router.get("/get-recipe-by-id/:recipeId", searchController.getRecipeById);
router.get("/get-recipes", recipeController.getRecipes);

module.exports = router;
