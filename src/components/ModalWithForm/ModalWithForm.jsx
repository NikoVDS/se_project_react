import "./ModalWithForm.css";
import close from "../../assets/close.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  secondaryButtonText,
  onSecondaryButtonClick,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__is-opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>

        <button onClick={onClose} type="button" className="modal__close">
          <img className="modal__close-image" src={close} alt="close" />
        </button>

        <form onSubmit={onSubmit} className="modal__form" noValidate>
          {children}

          <div className="modal__actions">
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>

            {secondaryButtonText && (
              <button
                type="button"
                className="modal__secondary-button"
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
