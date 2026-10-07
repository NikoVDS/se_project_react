import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultValues = {
  email: "",
  password: "",
};

function LoginModal({ isOpen, onClose, onLogin }) {
  const { values, handleChange, errors, validateForm } =
    useFormWithValidation(defaultValues);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    onLogin(values);
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
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
    </ModalWithForm>
  );
}

export default LoginModal;
