import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ weatherData, isMobileMenuOpened }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section
      className={`weather-card ${isMobileMenuOpened ? "weather-card_hidden" : ""}`}
    >
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}
        &deg;{currentTemperatureUnit}{" "}
        {/* As an alternative here instead of the ternary operator, I could use a single weatherData.temp without the dot notation followed by:
        [currentTemperatureUnit], the expression within brackets would evaluate to a string "F" or "C", i.e.: weatherData.temp[currentTemperatureUnit]. It would
        make the code more succinct and have the same effect. */}
      </p>
      <img
        src={weatherOption?.url}
        alt={`${weatherOption?.day ? "day" : "night"}time`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
