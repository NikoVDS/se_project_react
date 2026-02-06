import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import mobileMenu from "../../assets/mobile-menu.png";
import close from "../../assets/close.svg";

function Header({
  handleAddClick,
  weatherData,
  handleMobileMenuClick,
  isMobileMenuOpened,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img
        className={`header__logo ${isMobileMenuOpened ? "header__logo_hidden" : ""}`}
        src={logo}
        alt="header logo"
      />
      <p
        className={`header__date-and-location ${isMobileMenuOpened ? "header__date-and-location_hidden" : ""}`}
      >
        {currentDate}, {weatherData.city}{" "}
        {/* This line of code is actually working, I have found out that depending on the city the API won't return the city name appropriately
        and instead it will be just an empty string. Here is a screen shot of it working accordingly: https://prnt.sc/LjtXNyBHVegM. You just have to go into constants.js and change
        the values for the coordinates variable and the city name will display properly. */}
      </p>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Profile Picture" className="header__avatar" />
        <button
          className={`header__mobile-menu ${isMobileMenuOpened ? "header__mobile-menu_hidden" : ""}`}
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
        className={`header__nav-menu ${isMobileMenuOpened ? "header__nav-menu_active" : ""}`}
      >
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Profile Picture" className="header__avatar" />
        </div>
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
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
