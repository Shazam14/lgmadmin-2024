import React, {useState, useEffect} from "react";
import "../../../../styles/admin.css";
import { useNavigate } from "react-router-dom";
import api from "../../../../services/api";
const AdminNavbar = () => {
  const [username, setUsername] = useState("Loading...");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch username from local storage
    const storedUsername = localStorage.getItem('username') || 'Admin';
    setUsername(storedUsername);
  }, []);

  const handleLogout = async () => {
    try {
      await api.fetchData("logout/", { method: "POST" });
      console.log("Logout successful");
      localStorage.removeItem('username');  // Clear the username from local storage on logout
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout failed", error);
      alert("Failed to log out. Please try again.");
    }
  };

  const getUsernameFromCookies = () => {
  try {
    const cookies = document.cookie.split("; ");
    console.log(cookies, "Cookies available");
    const usernameCookie = cookies.find(row => row.startsWith("username="));

    return usernameCookie
      ? decodeURIComponent(usernameCookie.split("=")[1])
      : "Admin";
  } catch (error) {
    console.error("Error parsing cookies:", error);
    return "Admin"; // Fallback to default if error occurs
  }
  };


  return (
    <header className="admin-navbar">
      <div className="admin-navbar-left">
        <div className="icon">
          <svg viewBox="0 0 512 512">
            <path d="M45.63 79.75L52 81.25v58.5C45 143.9 40 151.3 40 160c0 8.375 4.625 15.38 11.12 19.75L35.5 242C33.75 248.9 37.63 256 43.13 256h41.75c5.5 0 9.375-7.125 7.625-13.1L76.88 179.8C83.38 175.4 88 168.4 88 160c0-8.75-5-16.12-12-20.25V87.13L128 99.63l.001 60.37c0 70.75 57.25 128 128 128s127.1-57.25 127.1-128L384 99.62l82.25-19.87c18.25-4.375 18.25-27 0-31.5l-190.4-46c-13-3-26.62-3-39.63 0l-190.6 46C27.5 52.63 27.5 75.38 45.63 79.75zM359.2 312.8l-103.2 103.2l-103.2-103.2c-69.93 22.3-120.8 87.2-120.8 164.5C32 496.5 47.53 512 66.67 512h378.7C464.5 512 480 496.5 480 477.3C480 400 429.1 335.1 359.2 312.8z"></path>
          </svg>
        </div>
        <div className="text">LGM ADMIN PORTAL</div>
      </div>
      <div className="admin-navbar-search">
        <input type="text" className="input search-bar" placeholder="Search" />
        <button className="button">Search</button>
      </div>
      <div className="admin-navbar-right">
        <div className="dynamic-text">{username} (admin)</div>
        <div className="icons">
          <svg className="icon" viewBox="0 0 448 512">
            <path d="M256 32V51.2C329 66.03 384 130.6 384 208V226.8C384 273.9 401.3 319.2 432.5 354.4L439.9 362.7C448.3 372.2 450.4 385.6 445.2 397.1C440 408.6 428.6 416 416 416H32C19.4 416 7.971 408.6 2.809 397.1C-2.353 385.6-.2883 372.2 8.084 362.7L15.5 354.4C46.74 319.2 64 273.9 64 226.8V208C64 130.6 118.1 66.03 192 51.2V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32H256zM224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512z"></path>
          </svg>
          <svg className="icon" viewBox="0 0 512 512">
            <path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"></path>
          </svg>
        </div>
        <button className="button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
