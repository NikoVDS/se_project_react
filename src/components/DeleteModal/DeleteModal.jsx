import "./DeleteModal.css";
import close from "../../assets/close.svg";

function DeleteModal({
  activeModal,
  closeActiveModal,
  card,
  deleteItemHandler,
}) {
  const handleItemDelete = () => {
    deleteItemHandler(card._id);
  };

  return (
    <div
      className={`modal ${activeModal === "delete-garment" && "modal__is-opened"}`}
    >
      <div className="modal__content modal__content_type_delete">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        >
          <img className="modal__close-image" src={close} alt="close" />
        </button>
        <p className="modal__delete-inquiry">
          Are you sure you want to delete this item?
          <span>This action is irreversible</span>
        </p>
        <button
          className="modal__delete-confirm"
          type="button"
          onClick={handleItemDelete}
        >
          Yes, delete item
        </button>
        <button
          className="modal__delete-cancel"
          type="button"
          onClick={closeActiveModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteModal;
