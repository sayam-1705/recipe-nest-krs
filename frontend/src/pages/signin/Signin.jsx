import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signin.css";
import signinImage from "./signin.png";
import { validateEmail } from "../../utils/helper";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!pass) {
      setError("Please enter your password.");
      return;
    }

    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/user/login`,
        {
          email,
          pass,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("tokenExpiry", response.data.tokenExpiry);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="container">
      <div className="signin-image-container">
        <img src={signinImage} alt="Signin" className="signin-image" />
        <span className="app-name">RecipeNest</span>
      </div>
      <div className="form-container">
        <h1 className="signin-heading">SignIn</h1>
        <hr className="signin-hr" />
        <form onSubmit={handleSubmit} className="signin-form">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="pass"
              id="pass"
              placeholder="Enter Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="input-field"
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>
          <div className="error-message">{error}</div>
          <button type="submit" className="submit-button">
            SignIn
          </button>
        </form>
        <p className="navigate">
          Don't have an account?
          <Link to="/signup" className="link-text">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
