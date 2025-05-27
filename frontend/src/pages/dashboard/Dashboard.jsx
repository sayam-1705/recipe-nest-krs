import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import "./dashboard.css";
import Header from "../../components/header/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || !localStorage.getItem("token") || isTokenExpired()) {
      navigate("/signin");
      return;
    }
  }, [user, navigate]);

  const isTokenExpired = () => {
    const tokenExpiry = localStorage.getItem("tokenExpiry");
    if (!tokenExpiry) {
      localStorage.clear();
      return true;
    }
    const expiryDate = new Date(tokenExpiry);
    return expiryDate < new Date();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const handleUpdateRecipe = (recipeId) => {
    navigate(`/update-recipe/${recipeId}`);
  };

  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_BASEURL
        }/recipe/delete-recipe/${recipeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const newRecipes = recipes.filter((recipe) => recipe._id !== recipeId);
      setRecipes(newRecipes);
    } catch (error) {
      alert("Error deleting recipe: " + error.response.data.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_BASEURL}/user/delete/${user.email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            pass: password,
          },
        }
      );
      localStorage.clear();
      navigate("/signin");
    } catch (error) {
      alert("Error deleting account: " + error.response.data.message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmDeleteAccount = () => {
    handleDeleteAccount();
    closeModal();
  };

  const openRecipeModal = (recipeId) => {
    setRecipeToDelete(recipeId);
    setIsRecipeModalOpen(true);
  };

  const closeRecipeModal = () => {
    setIsRecipeModalOpen(false);
    setRecipeToDelete(null);
  };

  const confirmDeleteRecipe = () => {
    handleDeleteRecipe(recipeToDelete);
    closeRecipeModal();
  };

  useEffect(() => {
    if (user) {
      const fetchRecipes = async () => {
        try {
          const response = await axios.post(
            `${
              import.meta.env.VITE_BACKEND_BASEURL
            }/recipe/get-recipe-by-userId`,
            {
              userId: user.id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setRecipes(response.data);
        } catch (error) {
          alert("Error fetching recipes: " + error.response.data.message);
        }
      };
      fetchRecipes();
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="user-dashboard">
        <div className="dashboard-details">
          <h2 className="dashboard-heading">User Details</h2>
          <label htmlFor="name" className="dashboard-label">
            Name:
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={user.name}
            className="dashboard-input"
            readOnly
          />
          <label htmlFor="email" className="dashboard-label">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={user.email}
            className="dashboard-input"
            readOnly
          />
        </div>
        <div className="dashboard-recipes">
          <h2 className="dashboard-heading">Recipes Created</h2>
          <ul className="dashboard-list-container">
            {recipes.map((recipe, index) => (
              <li key={index} className="dashboard-list">
                <span className="user-recipe-name">{recipe.name}</span>
                <div className="recipe-buttons">
                  <button
                    onClick={() => handleUpdateRecipe(recipe._id)}
                    className="dashboard-update-button"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => openRecipeModal(recipe._id)}
                    className="dashboard-delete-button"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="dashboard-buttons">
          <button onClick={handleLogout} className="dashboard-logout">
            Logout
          </button>
          <button onClick={openModal} className="account-delete">
            Delete Account
          </button>
        </div>
      </div>
      <Modal
        isOpen={isRecipeModalOpen}
        onRequestClose={closeRecipeModal}
        className="dashboard-modal"
      >
        <h2 className="modal-heading">Confirm Deletion</h2>
        <p className="modal-text">
          Are you sure you want to delete this recipe?
        </p>
        <p className="modal-text-alert">This action cannot be undone.</p>
        <div className="modal-buttons">
          <button onClick={confirmDeleteRecipe} className="confirm-delete">
            Yes, Delete
          </button>
          <button onClick={closeRecipeModal} className="cancel-delete">
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="dashboard-modal"
      >
        <h2 className="modal-heading">Confirm Deletion</h2>
        <p className="modal-text">
          Are you sure you want to delete your account?
        </p>
        <p className="modal-text-alert">This action cannot be undone.</p>
        <label htmlFor="password" className="modal-text">
          Enter Password:
          <input
            name="password"
            type="password"
            className="modal-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="modal-buttons">
          <button onClick={confirmDeleteAccount} className="confirm-delete">
            Yes, Delete
          </button>
          <button onClick={closeModal} className="cancel-delete">
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
