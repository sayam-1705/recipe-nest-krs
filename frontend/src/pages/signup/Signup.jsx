import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";
import signupImage from "./signup.png";
import { validateEmail } from "../../utils/helper";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [cPass, setCpass] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError("Please enter your name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!pass) {
      setError("Please enter your password.");
      return;
    }
    if (!cPass) {
      setError("Please confirm your password.");
      return;
    }
    if (pass !== cPass) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_BASEURL}/user/register`,
        {
          name,
          email,
          pass,
          cPass,
        }
      );
      navigate("/signin");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="container">
      <div className="signup-image-container">
        <img src={signupImage} alt="Signup" className="signup-image" />
        <span className="app-name">RecipeNest</span>
      </div>
      <div className="form-container">
        <h1 className="signup-heading">SignUp</h1>
        <hr className="signup-hr" />
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input-field"
          />
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
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="cPass"
              id="cPass"
              placeholder="Confirm Password"
              value={cPass}
              onChange={(e) => setCpass(e.target.value)}
              className="input-field"
            />
            <span
              className="password-toggle"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "👁️" : "🙈"}
            </span>
          </div>
          <div className="error-message">{error}</div>
          <button type="submit" className="submit-button">
            SignUp
          </button>
        </form>
        <p className="navigate">
          Already have an account?
          <Link to="/signin" className="link-text">
            SignIn
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
