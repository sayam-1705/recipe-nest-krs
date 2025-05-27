import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Modal from "react-modal";
import "./carousel.css";
import Chart from "chart.js/auto";
import ShowRecipe from "../showRecipe/ShowRecipe";

const Carousel = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [location, setLocation] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const autoPlay = true;
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

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASEURL}/recipe/weather-suggestions`,
          { lat: location.latitude, lon: location.longitude }
        );
        setRecipes(response.data.recipes.slice(0, 5) || []);
      } catch (error) {
        console.error("Error fetching weather-based recipes:", error);
      }
    };

    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASEURL}/recipe/get-recipes`
        );
        setRecipes(response.data.recipes.slice(0, 5) || []);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    if (location) {
      fetchWeatherData();
    } else {
      fetchRecipes();
    }
  }, [location]);

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        handleNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, currentIndex, recipes.length]);

  useEffect(() => {
    loadChart();
  }, [selectedRecipe]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? recipes.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === recipes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleShowRecipe = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="carousel-container">
      {recipes.length > 0 ? (
        <>
          <div
            className="carousel-wrapper"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {recipes.map((recipe, index) => (
              <div
                key={recipe._id}
                className={`carousel-slide ${
                  index === currentIndex ? "active" : "inactive"
                }`}
              >
                <div className="carousel-image-container">
                  <img
                    className="carousel-image"
                    src={
                      recipe.image.startsWith("data:")
                        ? recipe.image
                        : `data:image/jpeg;base64,${recipe.image}`
                    }
                    alt={recipe.name}
                  />
                  <div className="carousel-info">
                    <h3 className="info-text">{recipe.name}</h3>
                    <button
                      onClick={() => handleShowRecipe(recipe)}
                      className="recipe-link"
                    >
                      Show Recipe
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="prev-button" onClick={handlePrev}>
            ⪻
          </button>
          <button className="next-button" onClick={handleNext}>
            ⪼
          </button>
        </>
      ) : (
        <p className="loading-text">Loading Recipes...</p>
      )}
      {selectedRecipe && (
        <Modal
          isOpen={!!selectedRecipe}
          onAfterOpen={loadChart}
          onRequestClose={closeModal}
          contentLabel="Recipe Details"
          appElement={document.getElementById("root")}
        >
          <ShowRecipe
            recipe={selectedRecipe}
            chartReference={chartRef}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Carousel;
