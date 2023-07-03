import React from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.owner.includes(currentUser._id);
  const isLiked = props.likes.some(
    (likeOwner) => likeOwner.includes(currentUser._id)
  );
  const cardLikeButtonClassName = `gallery__item-like ${
    isLiked && "gallery__item-like_active"
  }`;

  function handleClick() {
    props.onCardClick(props);
  }
  function handleLikeClick() {
    props.onCardLike(props);
  }
  function handleDeleteClick() {
    props.onCardDelete(props);
  }

  return (
    <li className="gallery__item">
      <img
        src={props.link}
        alt={props.name}
        className="gallery__item-image"
        onClick={handleClick}
      />
      {isOwn && (
        <button
        className="button gallery__trash"
        type="button"
        onClick={handleDeleteClick}
        ></button>
        )}
      <div className="gallery__info">
        <h2 className="gallery__item-name">{props.name}</h2>
        <div className="gallery__like-block">
          <button
            className={`button ${cardLikeButtonClassName}`}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="gallery__like-count">{props.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
