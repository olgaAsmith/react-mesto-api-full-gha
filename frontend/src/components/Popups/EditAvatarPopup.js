import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const userAvatar = React.useRef();

  //*clean inputs values
  React.useEffect(() => {
    if (props.isOpen) {
      userAvatar.current.value = "";
    }
  }, [props.isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar(userAvatar.current.value);
  }

  return (
    <PopupWithForm
      popupName="popup_set-new-avatar"
      containerName="popup__container_set-new-avatar"
      titleClassName="popup__title_new-avatar"
      title="Обновить аватар"
      formClassName="popup__form_avatar"
      formName="addAvatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="popup-input-avatar-link"
        className="input popup__input popup__input_avatar_link"
        type="url"
        defaultValue=""
        name="avatarLink"
        required
        placeholder="Ссылка на новый аватар"
        ref={userAvatar}
      />
      <span id="popup-input-avatar-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
