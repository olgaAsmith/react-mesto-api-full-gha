import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const nameNewPlace = React.useRef();
  const linkNewPlace = React.useRef();

  //*clean inputs values
  React.useEffect(() => {
    if (props.isOpen) {
      nameNewPlace.current.value = "";
      linkNewPlace.current.value = "";
    }
  }, [props.isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace(nameNewPlace.current.value, linkNewPlace.current.value);
  }

  return (
    <PopupWithForm
      popupName="popup_new-place"
      title="Новое место"
      formClassName="popup__form_cards"
      formName="addCard"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="popup-input-image-name"
        className="input popup__input popup__input_image_name"
        type="text"
        defaultValue=""
        name="placeName"
        required
        placeholder="Название"
        minLength="2"
        maxLength="30"
        ref={nameNewPlace}
      />
      <span id="popup-input-image-name-error" className="popup__error"></span>
      <input
        id="popup-input-image-link"
        className="input popup__input popup__input_image_link"
        type="url"
        defaultValue=""
        name="placeLink"
        required
        placeholder="Ссылка на картинку"
        ref={linkNewPlace}
      />
      <span id="popup-input-image-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
