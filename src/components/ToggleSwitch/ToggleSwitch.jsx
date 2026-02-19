import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext, // #1 - Here, the value of CurrentTemperatureUnitContext (currentTemperatureUnit, handleToggleSwitchChange is passed to the destructured variables)
    // But I could also do: const context = useContext(CurrentTemperatureUnitContext) and down on the label and span tags I could:
  );

  return (
    <label className="toggle-switch" htmlFor={`header-switch`}>
      <input
        className="toggle-switch__checkbox"
        type="checkbox"
        onChange={handleToggleSwitchChange} // #2 - Use context.handleToggleSwitchChange instead
        id={`header-switch`}
      />
      <span className="toggle-switch__knob"></span>
      <span
        className={`toggle-switch__text toggle-switch__text_F ${currentTemperatureUnit /* #3 - Use context.currentTemperatureUnit instead */ === "F" ? "toggle-switch__text_color_white" : ""}`}
      >
        F
      </span>
      <span
        className={`toggle-switch__text toggle-switch__text_C ${currentTemperatureUnit === "C" ? "toggle-switch__text_color_white" : ""}`}
      >
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;
