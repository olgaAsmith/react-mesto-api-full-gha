import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_gallery-image
    ${props.card.isOpen ? "popup_opened" : ''}`}>
      <div className="popup__image-container">
        <img src={props.card.cardLink} alt={props.card.cardName} className="popup__image-full" />
        <p className="popup__image-caption">{props.card.cardName}</p>
        <button className="popup__close-button button" type="button" onClick={props.onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;
