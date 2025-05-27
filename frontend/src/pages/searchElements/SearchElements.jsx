import React, { useState } from "react";
import axios from "axios";
import "./searchElements.css";
import Header from "../../components/header/Header";
import RecipeGrid from "../../components/recipeGrid/RecipeGrid";

const SearchElements = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [season, setSeason] = useState("");
  const [occasion, setOccasion] = useState("");
  const [type, setType] = useState("");
  const [mealType, setMealType] = useState("");
  const [time, setTime] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [displayGrid, setDisplayGrid] = useState(false);
  const [error, setError] = useState("");

  const handleIngredientChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleReset = () => {
    setName("");
    setIngredients("");
    setSeason("");
    setOccasion("");
    setType("");
    setMealType("");
    setTime("");
    setDifficulty("");
    setRecipes([]);
    setDisplayGrid(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisplayGrid(true);
    setError("");
    const ingredientsArray = ingredients.split(",").map((item) => item.trim());
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/recipe/search`,
        {
          name,
          ingredients: ingredientsArray,
          season,
          occasion,
          type,
          mealType,
          time,
          difficulty,
        }
      );
      setRecipes(response.data);
    } catch (error) {
      setError("An error occurred while fetching recipes. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <form className="search-filter-form" onSubmit={handleSubmit}>
        <h1 className="search-recipe">Search Recipes</h1>
        <div className="search-bar-container">
          <label htmlFor="name" className="search-label">
            Search by name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Search recipes by name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="search-bar"
          />
        </div>
        <div className="search-bar-container">
          <label htmlFor="ingredients" className="search-label">
            Search by ingredients
          </label>
          <input
            type="text"
            id="ingredients"
            placeholder="Search recipes by ingredients (comma separated)..."
            value={ingredients}
            onChange={handleIngredientChange}
            className="search-bar"
          />
        </div>
        <div className="filter-bar-container">
          <label className="search-label">Filter by</label>
          <div className="select-container">
            <select
              name="season"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="filter-select"
            >
              <option value="">Season</option>
              <option value="Summer">Summer</option>
              <option value="Winter">Winter</option>
              <option value="Spring">Spring</option>
              <option value="Autumn">Autumn</option>
            </select>
            <select
              name="occasion"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              className="filter-select"
            >
              <option value="">Occasion</option>
              <option value="Holiday">Holiday</option>
              <option value="Birthday">Birthday</option>
              <option value="Festive">Festive</option>
              <option value="Party">Party</option>
              <option value="Wedding">Wedding</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Picnic">Picnic</option>
            </select>
            <select
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="filter-select"
            >
              <option value="">Type</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
              <option value="Vegan">Vegan</option>
            </select>
            <select
              name="mealType"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="filter-select"
            >
              <option value="">Meal Category</option>
              <option value="Appetizers">Appetizers</option>
              <option value="Main Courses">Main Courses</option>
              <option value="Side Dishes">Side Dishes</option>
              <option value="Desserts">Desserts</option>
              <option value="Snacks">Snacks</option>
              <option value="Beverages">Beverages</option>
            </select>
            <select
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="filter-select"
            >
              <option value="">Time</option>
              <option value="10-30">10-30 minutes</option>
              <option value="30-60">30-60 minutes</option>
              <option value="60+">60+ minutes</option>
            </select>
            <select
              name="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="filter-select"
            >
              <option value="">Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
        <div className="button-container">
          <button type="submit" className="search-button">
            Search
          </button>
          <button type="reset" className="reset-button" onClick={handleReset}>
            Reset Filters
          </button>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      {displayGrid &&
        (recipes.length > 0 ? (
          <RecipeGrid recipes={recipes} />
        ) : (
          <h1 className="no-recipes">No recipes found</h1>
        ))}
    </>
  );
};

export default SearchElements;
