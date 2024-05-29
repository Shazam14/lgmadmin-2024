import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/adminlogin.css";
import { AdminRoleContext } from "../contexts/AdminRoleContext";
import axiosConfig from "./../axiosConfig";
const AdminLogin = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSignup, setIsSignup] = useState(false); // State for toggling
  const { updateAdminRole } = useContext(AdminRoleContext);
  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosConfig.post("login/", {
        username: username,
        password: password,
      });
      console.log("Login response LINE 23:", response.data);

      const token = response.data.access;

      const refreshToken = response.data.refresh;
      Cookies.set("access_token", token, {
        expires: 7,
      });
      Cookies.set("refresh_token", refreshToken, {
        expires: 7,
      });

      console.log(token, "token in Admin login");
      console.log(refreshToken, "response data refresh");

      setToken(token);
      updateAdminRole(true);
      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosConfig.post("signup/", {
        username: username,
        password: password,
        email: email,
      });
      console.log(response.data.access, "GETTING THERE");
      const token = response.data.access;
      const refreshToken = response.data.refresh; // Update based on your response structure
      console.log(token, "tRYING TO GET TOKEN DATA HERE");
      Cookies.set("access_token", token, { path: "/" });
      Cookies.set("refresh_token", refreshToken, { path: "/" });

      console.log("Access token after setting:", Cookies.get("access_token"));
      console.log("Refresh token after setting:", Cookies.get("refresh_token"));

      updateAdminRole(true);
      Navigate();
      console.log("after the admin Role");
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
