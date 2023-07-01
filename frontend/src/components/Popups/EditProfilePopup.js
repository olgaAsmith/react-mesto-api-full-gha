import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  //*form submit, take values to update function (APP)
  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  //* changes in inputs in real time
  function handleInputChangeName(event) {
    setName(event.target.value);
  }
  function handleInputChangeAbout(event) {
    setDescription(event.target.value);
  }

  return (
    <PopupWithForm
      popupName="popup_edit-profile"
      title="Редактировать профиль"
      formClassName="popup__form_profile"
      formName="profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="popup-input-tag-name"
        className="input popup__input popup__input_tag_name"
        type="text"
        name="accountName"
        required
        placeholder="Ваше имя"
        minLength="2"
        maxLength="40"
        value={name || ''}
        onChange={handleInputChangeName}
      />
      <span id="popup-input-tag-name-error" className="popup__error"></span>
      <input
        id="popup-input-tag-prof"
        className="input popup__input popup__input_tag_prof "
        type="text"
        name="accountProf"
        required
        placeholder="Ваш род деятельности"
        minLength="2"
        maxLength="200"
        value={description || ''}
        onChange={handleInputChangeAbout}
      />
      <span id="popup-input-tag-prof-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
