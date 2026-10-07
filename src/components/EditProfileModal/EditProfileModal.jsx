import { useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultValues = {
  name: "",
  avatar: "",
};

function EditProfileModal({ isOpen, onClose, onSubmit, currentUser }) {
  const { values, handleChange, setValues, errors, validateForm } =
    useFormWithValidation(defaultValues);

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setValues]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(values);
  };

  return (
    <ModalWithForm
      title="Edit profile"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          name="name"
          className="modal__input"
          type="text"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label className="modal__label">
        Avatar
        <input
          name="avatar"
          className="modal__input"
          type="url"
          value={values.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
