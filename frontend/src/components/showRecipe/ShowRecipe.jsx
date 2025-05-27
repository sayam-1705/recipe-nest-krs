import "./showRecipe.css";

const ShowRecipe = ({ recipe, chartReference, onClose }) => {
  if (!recipe) {
    return <div className="error-message">Recipe not found</div>;
  }

  const recipeImage = recipe.image.startsWith("data:")
    ? recipe.image
    : `data:image/jpeg;base64,${recipe.image}`;

  return (
    <>
      <div className="recipe-details">
        <div className="close-button" onClick={onClose}>
          &#10006;
        </div>
        <h2 className="show-recipe-name">{recipe.name}</h2>
        <div className="micro-descriptions">
          <div className="show-recipe-image-container">
            <img
              src={recipeImage}
              alt={recipe.name}
              className="show-recipe-image"
            />
          </div>
          <div className="recipe-micro-details">
            <div className="micro-container">
              <span className="micro-details">Occasion :</span>
              <span className="micro-details"> {recipe.occasion}</span>
            </div>
            <div className="micro-container">
              <span className="micro-details">Season :</span>
              <span className="micro-details">{recipe.season}</span>
            </div>
            <div className="micro-container">
              <span className="micro-details">Meal Type :</span>
              <span className="micro-details"> {recipe.mealType}</span>
            </div>
            <div className="micro-container">
              <span className="micro-details">Type :</span>
              <span className="micro-details"> {recipe.type}</span>
            </div>
            <div className="micro-container">
              <span className="micro-details">Time :</span>
              <span className="micro-details"> {recipe.time} Minutes</span>
            </div>
            <div className="micro-container">
              <span className="micro-details">Difficulty :</span>
              <span className="micro-details"> {recipe.difficulty}</span>
            </div>
            <div className="micro-container">
              <span className="micro-details">Servings :</span>
              <span className="micro-details"> {recipe.servings}</span>
            </div>
            <div className="micro-container">
              <span className="micro-details">Total Nutrition :</span>
              <span className="micro-details">
                {recipe.nutritionPerServing}
              </span>
            </div>
          </div>
        </div>
        <div className="recipe-ingredients">
          <h3 className="show-recipe-heading">Ingredients</h3>
          <div className="ingredient-info-container">
            <ul>
              {recipe.ingredients?.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name} - {ingredient.quantity}
                </li>
              ))}
            </ul>
            <div className="pie-chart">
              <canvas ref={chartReference}></canvas>
            </div>
          </div>
        </div>
        <div className="recipe-instructions">
          <h3 className="show-recipe-heading">Instructions</h3>
          <ol>
            {recipe.instructions?.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default ShowRecipe;
