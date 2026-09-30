import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ activeModal, closeActiveModal, onSubmit }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      name,
      avatar,
    });
  };

  return (
    <ModalWithForm
      title="Edit profile"
      buttonText="Save changes"
      activeModal={activeModal === "edit-profile"}
      closeActiveModal={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Name"
        />
      </label>

      <label className="modal__label">
        Avatar
        <input
          className="modal__input"
          type="url"
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
          placeholder="Avatar URL"
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
