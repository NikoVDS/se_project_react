import { useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// onAddItem refers to the submit handler declared in App.jsx
const AddItemModal = ({ isOpen, onAddItem, closeActiveModal, activeModal }) => {
  const defaultValues = { name: "", link: "", weather: "" };
  const { values, handleChange, setValues } = useForm(defaultValues);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
    }
  }, [isOpen]); // This useEffect hook is resetting the form's state whenever it is opened, as I can see, the isOpen prop is being passed to the dependency array
  // Meaning that every time that method is called when the form modal is opened, the method runs and wipes the input values of the form.

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      activeModal={activeModal}
    >
      <label className="modal__label">
        Name{" "}
        <input
          name="name"
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          name="link"
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={values.link}
          onChange={handleChange}
          required
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="hot"
            onChange={handleChange}
            required
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
            onChange={handleChange}
            required
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
            onChange={handleChange}
            required
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
