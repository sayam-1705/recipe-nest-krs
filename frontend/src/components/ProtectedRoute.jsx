import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const tokenExpiry = localStorage.getItem("tokenExpiry");

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

  if (!user || !token || isTokenExpired()) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoute;
