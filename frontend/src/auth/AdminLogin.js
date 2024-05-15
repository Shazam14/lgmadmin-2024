import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../styles/adminlogin.css";
import { AdminRoleContext } from "../contexts/AdminRoleContext";
import api from "../services/api";
const AdminLogin = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSignup, setIsSignup] = useState(false); // State for toggling
  const { setIsAdmin } = useContext(AdminRoleContext);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("login/", {
        username: username,
        password: password,
      });

      const token = response.data.token;
      console.log("Token from Admin Login:", token);
      Cookies.set("access_token", token, { path: "/" });

      const storedToken = Cookies.get("access_token");
      console.log("Token stored in cookies:", storedToken);

      if (setToken) {
        setToken(token);
      }

      setIsAdmin(true);
      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("signup/", {
        username: username,
        password: password,
        email: email,
      });

      const token = response.data.token;
      Cookies.set("access_token", token, { path: "/" });

      // Verify token set in cookies
      const storedToken = Cookies.get("access_token");
      console.log("Token stored in cookies:", storedToken);

      setIsAdmin(true);
      navigate("/admin");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isSignup ? "Admin Signup" : "Admin Login"}</h2>
        <form onSubmit={isSignup ? handleSignup : handleLogin}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          {isSignup && (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">{isSignup ? "Signup" : "Login"}</button>
        </form>
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Signup"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
