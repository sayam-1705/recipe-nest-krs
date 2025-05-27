import { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import "./recipeGrid.css";
import Chart from "chart.js/auto";
import ShowRecipe from "../showRecipe/ShowRecipe";

const RecipeGrid = ({ recipes }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  function loadChart() {
    if (selectedRecipe && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext("2d");
      const filteredIngredients = selectedRecipe.ingredients.filter(
        (ingredient) => ingredient.nutrition.calories > 0
      );
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: filteredIngredients.map((ingredient) => ingredient.name),
          datasets: [
            {
              label: "Calories per Ingredient",
              data: filteredIngredients.map(
                (ingredient) => ingredient.nutrition.calories
              ),
              backgroundColor: [
                "red",
                "blue",
                "green",
                "yellow",
                "orange",
                "purple",
                "pink",
                "brown",
                "gray",
                "black",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedRecipe(null);
  };

  const getImageSrc = (image) => {
    return image.startsWith("data:")
      ? image
      : `data:image/jpeg;base64,${image}`;
  };

  useEffect(() => {
    if (modalIsOpen) {
      setTimeout(loadChart, 100);
    }
  }, [modalIsOpen, selectedRecipe]);

  return (
    <div className="recipe-grid">
      {recipes
        .map((recipe, index) => (
          <div className="recipe-card" key={recipe._id || index}>
            <img
              src={getImageSrc(recipe.image)}
              alt={recipe.name}
              className="recipe-image"
            />
            <div className="recipe-info-container">
              <h3 className="recipe-name">{recipe.name}</h3>
              <button
                className="recipe-view-button"
                onClick={() => openModal(recipe)}
              >
                View Recipe
              </button>
            </div>
          </div>
        ))
        .reverse()}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Recipe Modal"
        appElement={document.getElementById("root") || undefined}
      >
        {selectedRecipe && (
          <ShowRecipe
            recipe={selectedRecipe}
            chartReference={chartRef}
            onClose={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default RecipeGrid;
