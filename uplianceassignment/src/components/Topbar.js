import React from "react";
import "../Styles/TopBar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Topbar = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <nav>
        <ul className="nav-bar-items">
          <li className="nav-bar-item">
            <Link to="/updateprofile">Profile</Link>
          </li>
          <li className="nav-bar-item">
            <Link to="/todolist">To-do</Link>
          </li>
          <li className="nav-bar-item" onClick={handleLogout}>Logout</li>
        </ul>
      </nav>
    </div>
  );
};

export default Topbar;
