import "./recipeComponent.css";

const RecipeComponent = ({
  name,
  setName,
  setImageFile,
  image,
  ingredientName,
  setIngredientName,
  quantity,
  setQuantity,
  handleIngredientSubmit,
  instruction,
  setInstruction,
  handleInstructionSubmit,
  servings,
  setServings,
  season,
  setSeason,
  occasion,
  setOccasion,
  type,
  setType,
  mealType,
  setMealType,
  time,
  setTime,
  difficulty,
  setDifficulty,
  handleSubmit,
  ingredients,
  handleIngredientUpdate,
  handleIngredientDelete,
  instructions,
  handleInstructionUpdate,
  handleInstructionDelete,
  functionality,
  error,
}) => {
  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <div className="element-container">
        <h3 className="element-heading">Recipe Name</h3>
        <input
          className="input-element"
          type="text"
          placeholder="Enter recipe name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="element-container">
        <h3 className="element-heading">Recipe Image</h3>
        <input
          className="input-element"
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />
      </div>
      <div className="element-container-lgb">
        <div className="element-container">
          <h3 className="element-heading">Ingredients</h3>
          <input
            className="input-element"
            type="text"
            placeholder="Enter ingredient name..."
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
          />
          <input
            className="input-element"
            type="text"
            placeholder="Enter quantity..."
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            className="add-button"
            type="button"
            onClick={handleIngredientSubmit}
          >
            Add Ingredient
          </button>
        </div>
        <ul className="recipe-list-container">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="list-content">
              <span className="span-title">
                {ingredient.name} - {ingredient.quantity}
              </span>
              <div className="recipe-option-buttons">
                <button
                  className="recipe-update-button"
                  type="button"
                  onClick={() => handleIngredientUpdate(index)}
                >
                  Update
                </button>
                <button
                  className="recipe-delete-button"
                  type="button"
                  onClick={() => handleIngredientDelete(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="element-container">
        <h3 className="element-heading">Season</h3>
        <select
          className="select-field"
          name="season"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="all">Season</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Autumn">Autumn</option>
        </select>
      </div>
      <div className="element-container">
        <h3 className="element-heading">Occasion</h3>
        <select
          className="select-field"
          name="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
        >
          <option value="all">Occasion</option>
          <option value="Holiday">Holiday</option>
          <option value="Birthday">Birthday</option>
          <option value="Festive">Festive</option>
          <option value="Party">Party</option>
          <option value="Wedding">Wedding</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Picnic">Picnic</option>
        </select>
      </div>
      <div className="element-container">
        <h3 className="element-heading">Type</h3>
        <select
          className="select-field"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">Type</option>
          <option value="Veg">Veg</option>
          <option value="Non-Veg">Non-Veg</option>
          <option value="Vegan">Vegan</option>
        </select>
      </div>
      <div className="element-container">
        <h3 className="element-heading">Meal Type</h3>
        <select
          className="select-field"
          name="mealType"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        >
          <option value="all">Meal Category</option>
          <option value="Appetizers">Appetizers</option>
          <option value="Main Courses">Main Courses</option>
          <option value="Side Dishes">Side Dishes</option>
          <option value="Desserts">Desserts</option>
          <option value="Snacks">Snacks</option>
          <option value="Beverages">Beverages</option>
        </select>
      </div>
      <div className="element-container">
        <h3 className="element-heading">Time</h3>
        <input
          className="input-element"
          type="number"
          placeholder="Enter time in minutes..."
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <span className="time-text">Minutes</span>
      </div>
      <div className="element-container">
        <h3 className="element-heading">Difficulty</h3>
        <select
          className="select-field"
          name="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="all">Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>
      <div className="element-container-lgb">
        <div className="element-container">
          <h3 className="element-heading">Instructions</h3>
          <input
            className="input-element"
            type="text"
            placeholder="Enter instruction..."
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />
          <button
            className="add-button"
            type="button"
            onClick={handleInstructionSubmit}
          >
            Add Instruction
          </button>
        </div>
        <ol className="recipe-list-container">
          {instructions.map((instruction, index) => (
            <li key={index} className="list-content">
              <span className="span-title">{instruction}</span>
              <div className="recipe-option-buttons">
                <button
                  className="recipe-update-button"
                  type="button"
                  onClick={() => handleInstructionUpdate(index)}
                >
                  Update
                </button>
                <button
                  className="recipe-delete-button"
                  type="button"
                  onClick={() => handleInstructionDelete(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="element-container">
        <h3 className="element-heading">Servings</h3>
        <input
          className="input-element"
          type="number"
          placeholder="Enter number of servings..."
          value={servings}
          onChange={(e) => setServings(e.target.value)}
        />
      </div>
      {error && <div className="client-error-message">{error}</div>}
      <button type="submit" className="recipe-submit-button">
        {functionality}
      </button>
    </form>
  );
};

export default RecipeComponent;
