import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./header.css";

const Header = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [weather, setWeather] = useState(null);
  const [place, setPlace] = useState(null);
  const [userInitial, setUserInitial] = useState("");
  const currentPath = useLocation().pathname;

  const isTokenExpired = () => {
    if (!tokenExpiry) {
      localStorage.clear();
      return true;
    }
    const expiryDate = new Date(tokenExpiry);
    if (expiryDate < new Date()) {
      localStorage.clear();
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (user) {
      const userName = JSON.parse(user).name;
      setUserInitial(userName.charAt(0).toUpperCase());
    }
  }, [user]);

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
    const fetchData = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_BASEURL}/recipe/weather-suggestions`,
          { lat: location.latitude, lon: location.longitude }
        );
        setTemperature(response.data.temperature);
        setWeather(response.data.weatherDescription);
        setPlace(response.data.placeName);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    if (location) {
      fetchData();
    }
  }, [location]);

  return (
    <header className="header">
      <h1 className="logo">RecipeNest🍴</h1>
      <nav className="nav">
        <Link
          to="/"
          className={`nav-link ${currentPath === "/" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/search-recipe"
          className={`nav-link ${
            currentPath === "/search-recipe" ? "active" : ""
          }`}
        >
          Recipe Finder
        </Link>
        {user && (
          <Link
            to="/create-recipe"
            className={`nav-link ${
              currentPath === "/create-recipe" ? "active" : ""
            }`}
          >
            Recipe Upload
          </Link>
        )}
      </nav>
      <div className="user-info">
        {place ? (
          <div className="weather-info">
            <span className="weather">{place}</span>
            <span className="weather">
              {weather}, {temperature}°C
            </span>
          </div>
        ) : (
          <span className="weather">Fetching Location...</span>
        )}
        {user ? (
          <Link to="/dashboard" className="dashboard-link">
            {userInitial}
          </Link>
        ) : (
          <>
            <Link to="/signin" className="connect-link">
              SignIn
            </Link>
            <Link to="/signup" className="connect-link">
              SignUp
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
