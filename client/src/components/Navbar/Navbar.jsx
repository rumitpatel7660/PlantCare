import React, { useState, useEffect } from "react";
import logo from "../../assests/plantcarelogo.png";
import "./NavbarStyles.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [userData, setUserData] = useState(null);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false);
          return;
        }

        const { data } = await axios.get("http://localhost:8080/api/users/me", {
          headers: { "x-auth-token": token },
        });

        setUserData(data);
        setIsLoggedIn(true);

        const currentDate = new Date();
        if (data.subscription && new Date(data.subscription.endDate) > currentDate) {
          setHasSubscription(true);
        } else {
          setHasSubscription(false);
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(null);
    setHasSubscription(false);
    navigate("/");
  };

  return (
    <nav className="NavbarItems">
      <img className="navbar-logo" src={logo} alt="logo" />

      <ul className="nav-menu">
        <li>
          <Link to="/" className="nav-links">
            <i className="fa-solid fa-house-user"></i> Home
          </Link>
        </li>
        <li>
          <Link to="/about" className="nav-links">
            <i className="fa-solid fa-circle-info"></i> About
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/service" className="nav-links">
              <i className="fa-solid fa-briefcase"></i> Service
            </Link>
          </li>
        )}
        <li>
          <Link to="/contact" className="nav-links">
            <i className="fa-solid fa-address-book"></i> Contact
          </Link>
        </li>

        {isLoggedIn ? (
          <li className="profile-dropdown">
            <div className="profile-info">
              <div className="user-initial">
                {userData.firstName[0].toUpperCase()}
              </div>
            </div>
            <div className="dropdown-content">
              <div className="profile-header">
                <div className="profile-initial">
                  {userData.firstName[0].toUpperCase()}
                </div>
                <p className="profile-name">{userData.firstName} {userData.lastName}</p>
              </div>
              <p className="profile-email">
                <i className="fa-solid fa-envelope"></i> {userData.email}
              </p>
              {hasSubscription ? (
                <p className="subscription-details">
                  <strong>Subscription:</strong> {userData.subscription.plan} <br />
                  <strong>Ends on:</strong> {new Date(userData.subscription.endDate).toLocaleDateString()}
                </p>
              ) : (
                <p className="no-subscription">No active subscription</p>
              )}
              <button className="logout" onClick={handleLogout}>
                <i className="fa-solid fa-sign-out-alt"></i> Logout
              </button>
            </div>
          </li>
        ) : (
          <li>
            <Link to="/login" className="nav-links">
              <i className="fa-solid fa-sign-in-alt"></i> Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;