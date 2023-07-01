import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main({
  cards,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="account">
        <div className="account__avatar-place">
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="account__image"
            onClick={onEditAvatar}
          />
          <img
            src={require("../images/pencil.png")}
            alt="Карандаш"
            className="account__image-edit"
          />
        </div>
        <div className="account__owner">
          <h1 className="account__name">{currentUser.name}</h1>
          <button
            className="button account__edit"
            type="button"
            onClick={onEditProfile}
          ></button>
          <p className="account__profession">{currentUser.about}</p>
        </div>
        <button
          className="button account__add-image"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="gallery">
        <ul className="list gallery__items">
          {cards.map(({ ...props }) => {
            return (
              <Card
                key={props._id}
                {...props}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
