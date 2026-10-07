import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultValues = {
  name: "",
  avatar: "",
  email: "",
  password: "",
};

function RegisterModal({ isOpen, onClose, onRegister }) {
  const { values, handleChange, errors, validateForm } =
    useFormWithValidation(defaultValues);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onRegister(values);
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email
        <input
          name="email"
          className="modal__input"
          type="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      <label className="modal__label">
        Password
        <input
          name="password"
          className="modal__input"
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>

      <label className="modal__label">
        Name
        <input
          name="name"
          className="modal__input"
          type="text"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label className="modal__label">
        Avatar
        <input
          name="avatar"
          className="modal__input"
          type="url"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
