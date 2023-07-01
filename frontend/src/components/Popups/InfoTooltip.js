import React from "react";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_info-tooltip
    ${props.isOpen ? "popup_opened" : ""}`}
    >
      {console.log(props.isSuccessReg)}
      <div className="popup__container popup__container_info-tooltip">
        <div className="popup__min-container">
          <div
            className={`popup__image-reg
    ${
      props.isSuccessReg ? "popup__image-reg_success" : "popup__image-reg_error"
    }`}
          ></div>
          <p className="popup__text-reg">
            {props.isSuccessReg
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз"}
          </p>
        </div>
        <button
          className="popup__close-button button"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
