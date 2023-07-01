import React from "react";

function PopupWithForm(props) {
  return (
    <>
      <div
        className={`popup ${props.popupName}
      ${props.isOpen ? "popup_opened" : ""}`}
      >
        <div className={`popup__container ${props.containerName}`}>
          <h3 className={`title popup__title ${props.titleClassName}`}>
            {props.title}
          </h3>
          <form
            action="#"
            className={`popup__form ${props.formClassName}`}
            name={props.formName}
            onSubmit={props.onSubmit}
          >
            {props.children} {/* // & diff inputs} */}
            <button
              className={`popup__save button popup__button ${props.buttonClassName}`}
              type="submit"
            >
              {props.buttonText || "Сохранить"}
            </button>
          </form>
          <button
            className="popup__close-button button"
            type="button"
            onClick={props.onClose}
          ></button>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
