import { Link } from "react-router-dom";
import "./home.css";
import Carousel from "../../components/carousel/Carousel";
import Header from "../../components/header/Header";

const Home = () => {
  let user;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    console.error("Error parsing user data from localStorage", error);
    user = null;
  }

  return (
    <div>
      <Header />
      <span id="carousel-container">
        <Carousel />
      </span>
      <div className="how-to">
        <h1 className="info-heading">How It Works</h1>
        <div className="info-container">
          <div className="search">
            <div className="content">
              <h1 className="content-heading">Search for Recipes</h1>
              <p className="content-description">
                Find the perfect meal for any occasion! Search by dish,
                ingredient, or cuisine to discover new favorites and classic
                recipes. Endless possibilities await!
              </p>
              <Link to="/search-recipe" className="show-button">
                Search Recipes
              </Link>
            </div>
          </div>
          <div className="create">
            <div className="content">
              <h1 className="content-heading">Create Your Own Recipes</h1>
              <p className="content-description">
                Show off your kitchen skills! Create, edit, and save recipes to
                build your personal cookbook and share your creations with the
                world.
              </p>
              <Link
                to={user ? "/create-recipe" : "/signin"}
                className="show-button"
              >
                Create Recipes
              </Link>
            </div>
          </div>
          <div className="weather-suggestion">
            <div className="content">
              <h1 className="content-heading">
                Weather-Based Recipe Suggestion
              </h1>
              <p className="content-description">
                Get meal ideas perfect for any weather! Our app uses local
                weather data to suggest comforting dishes for chilly days or
                refreshing options for sunny ones. Effortless meal inspiration,
                rain or shine!
              </p>
              <a href="#carousel-container" className="show-button">
                Get Suggestions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
