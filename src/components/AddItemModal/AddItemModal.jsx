import { useEffect, useState } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultValues = { name: "", link: "", weather: "" };

// onAddItem refers to the submit handler declared in App.jsx
const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const { values, handleChange, resetForm, validateForm, errors } =
    useFormWithValidation(defaultValues);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
    link: false,
    weather: false,
  });

  const handleResetForm = () => {
    resetForm();
    setIsSubmitted(false);
    setTouched({ name: false, link: false, weather: false });
  };

  useEffect(() => {
    if (isOpen) {
      handleResetForm();
    }
  }, [isOpen]); // This useEffect hook is resetting the form's state whenever it is opened, as I can see, the isOpen prop is being passed to the dependency array
  // Meaning that every time that method is called when the form modal is opened, the method runs and wipes the input values of the form.

  // Validate when form is submitted
  useEffect(() => {
    if (isSubmitted) {
      const isValid = validateForm();
      if (isValid) {
        onAddItem(values);
        handleResetForm();
      }
    }
  }, [isSubmitted, validateForm, values, onAddItem]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setIsSubmitted(true);
  }

  function handleFieldBlur(evt) {
    const { name } = evt.target;
    setTouched({ ...touched, [name]: true });
  }

  function handleFieldChange(evt) {
    handleChange(evt);
    const { name } = evt.target;
    setTouched({ ...touched, [name]: true });
  }

  const shouldShowError = (fieldName) => {
    return touched[fieldName] || isSubmitted;
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <label className="modal__label">
        Name{" "}
        <input
          name="name"
          type="text"
          className={`modal__input ${shouldShowError("name") && errors.name ? "modal__input--invalid" : ""}`}
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
        />
        {shouldShowError("name") && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          name="link"
          type="url"
          className={`modal__input ${shouldShowError("link") && errors.link ? "modal__input--invalid" : ""}`}
          id="imageUrl"
          placeholder="Image URL"
          value={values.link}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
        />
        {shouldShowError("link") && errors.link && (
          <span className="modal__error">{errors.link}</span>
        )}
      </label>
      <fieldset
        className={`modal__radio-buttons ${shouldShowError("weather") && errors.weather ? "modal__radio-buttons--invalid" : ""}`}
      >
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="hot"
            onChange={handleFieldChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="warm"
            onChange={handleFieldChange}
          />
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="cold"
            onChange={handleFieldChange}
          />
          Cold
        </label>
        {shouldShowError("weather") && errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
