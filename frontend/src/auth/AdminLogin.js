import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../styles/adminlogin.css";
import { AdminRoleContext } from "../contexts/AdminRoleContext";
import apiClient from "../services/apiClient";

const AdminLogin = ({ setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAdmin } = useContext(AdminRoleContext);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await apiClient.post("login/", {
        username: username,
        password: password,
      });

      const token = response.data.access;
      const refreshToken = response.data.refresh;
      Cookies.set("access_token", token, { path: "/" });
      Cookies.set("refresh_token", refreshToken, { path: "/" });

      setIsAdmin(true);
      setAuthenticated(true);
      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-wrapper">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          <p>Username</p>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
