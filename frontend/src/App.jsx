import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/signup/Signup";
import Signin from "./pages/signin/Signin";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import UpdateRecipe from "./pages/updateRecipe/UpdateRecipe";
import CreateRecipe from "./pages/createRecipe/CreateRecipe";
import SearchElements from "./pages/searchElements/SearchElements";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update-recipe/:id"
            element={
              <ProtectedRoute>
                <UpdateRecipe />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-recipe"
            element={
              <ProtectedRoute>
                <CreateRecipe />
              </ProtectedRoute>
            }
          />
          <Route path="/search-recipe" element={<SearchElements />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
