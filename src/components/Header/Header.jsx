import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import mobileMenu from "../../assets/mobile-menu.png";
import close from "../../assets/close.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  handleMobileMenuClick,
  isMobileMenuOpened,
}) {
  const { currentUser, handleLogout, handleLoginClick, handleRegisterClick } =
    useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <header className="header">
      <NavLink to="/">
        <img
          className={`header__logo ${
            isMobileMenuOpened ? "header__logo_hidden" : ""
          }`}
          src={logo}
          alt="header logo"
        />
      </NavLink>

      <p
        className={`header__date-and-location ${
          isMobileMenuOpened ? "header__date-and-location_hidden" : ""
        }`}
      >
        {currentDate}, {weatherData.city}
      </p>

      <div className="header__user-container">
        <ToggleSwitch checked={checked} onChange={handleChange} />

        {currentUser ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>

            <NavLink className="header__nav-link" to="/profile">
              <p className="header__username">{currentUser.name}</p>

              <img
                src={currentUser.avatar || avatar}
                alt="Profile Picture"
                className="header__avatar"
              />
            </NavLink>
          </>
        ) : (
          <>
            <button
              type="button"
              className="header__auth-btn"
              onClick={handleLoginClick}
            >
              Log in
            </button>

            <button
              type="button"
              className="header__auth-btn"
              onClick={handleRegisterClick}
            >
              Sign up
            </button>
          </>
        )}

        <button
          className={`header__mobile-menu ${
            isMobileMenuOpened ? "header__mobile-menu_hidden" : ""
          }`}
          type="button"
          onClick={handleMobileMenuClick}
        >
          <img
            className="header__mobile-icon"
            src={mobileMenu}
            alt="mobile menu"
          />
        </button>
      </div>

      <div
        className={`header__nav-menu ${
          isMobileMenuOpened ? "header__nav-menu_active" : ""
        }`}
      >
        {currentUser ? (
          <div className="header__user-container">
            <NavLink className="header__nav-link" to="/profile">
              <p className="header__username">{currentUser.name}</p>

              <img
                src={currentUser.avatar || avatar}
                alt="Profile Picture"
                className="header__avatar"
              />
            </NavLink>

            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add Clothes
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="header__logout-btn"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="header__user-container">
            <button
              type="button"
              className="header__auth-btn"
              onClick={handleLoginClick}
            >
              Log in
            </button>

            <button
              type="button"
              className="header__auth-btn"
              onClick={handleRegisterClick}
            >
              Sign up
            </button>
          </div>
        )}

        <button
          className="header__close"
          type="button"
          onClick={handleMobileMenuClick}
        >
          <img src={close} alt="close" />
        </button>
      </div>
    </header>
  );
}

export default Header;
