import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./Popups/PopupWithForm";
import ImagePopup from "./Popups/ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import EditProfilePopup from "./Popups/EditProfilePopup";
import EditAvatarPopup from "./Popups/EditAvatarPopup";
import AddPlacePopup from "./Popups/AddPlacePopup";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./sign/Login";
import Register from "./sign/Register";
import InfoTooltip from "./Popups/InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { checkToken } from "../utils/Auth";

function App() {
  //*pops
  const [isEditProfilePopupOpen, SetIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, SetIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, SetIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, SetIsInfoTooltipOpen] = React.useState(false);
  //*cards - user
  const [selectedCard, SetSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  //*login
  const [isLogIn, SetIsLogIn] = React.useState(false);
  const [userEmail, SetUserEmail] = React.useState("");
  //*navigate
  const navigate = useNavigate();
  //*reg
  const [isSuccessReg, SetIsSuccessReg] = React.useState(false);

  //*get user data
  React.useEffect(() => {
    api
      .getUserData()
      .then((dataUser) => {
        setCurrentUser(dataUser);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //*set fsalse open pops
  const closeAllPopup = () => {
    SetIsEditProfilePopupOpen(false);
    SetIsAddPlacePopupOpen(false);
    SetIsEditAvatarPopupOpen(false);
    SetSelectedCard({});
    SetIsInfoTooltipOpen(false);
  };
  //*set true open pops
  const handleEditProfileClick = () => {
    SetIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    SetIsAddPlacePopupOpen(true);
  };
  const handleEditAvatarClick = () => {
    SetIsEditAvatarPopupOpen(true);
  };
  const handleCardClick = (card) => {
    SetSelectedCard({ cardLink: card.link, cardName: card.name, isOpen: true });
  };
  const handleInfoTooltipClick = (isSuccessReg) => {
    SetIsInfoTooltipOpen(true);
    SetIsSuccessReg(isSuccessReg);
  };

  //*get list card
  React.useEffect(() => {
    api
      .getCardsData()
      .then((dataCards) => {
        setCards([...dataCards]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //*like card
  const handleCardLike = (card) => {
    const isLiked = card.likes.some((owner) => owner._id === currentUser._id);
    api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //*delete card
  const handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //*add new card
  const handleNewPlace = (cardName, cardLink) => {
    api
      .createCard(cardName, cardLink)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //*change username
  const handleUpdateUser = (user) => {
    api
      .editUserInfo(user.name, user.about)
      .then(() => {
        setCurrentUser({ ...currentUser, name: user.name, about: user.about });
        closeAllPopup();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //*change avatar
  const handleUpdateAvatar = (avatar) => {
    api
      .setAvatar(avatar)
      .then(() => {
        setCurrentUser({ ...currentUser, avatar: avatar });
        closeAllPopup();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //*LOGGED ingo
  const handleLogin = () => {
    SetIsLogIn(true);
    handleTokenCheck();
  };
  const handleLogout = () => {
    SetIsLogIn(false);
  };

  //*TOKEN
  React.useEffect(() => {
    handleTokenCheck();
  }, []);
  const handleTokenCheck = () => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      checkToken(jwt)
        .then((res) => {
          if (res) {
            SetUserEmail(res.data.email);
            SetIsLogIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header
            isLogIn={isLogIn}
            handleLogout={handleLogout}
            userEmail={userEmail}
          />
          <Routes>
            <Route
              path="/"
              element={
                isLogIn ? (
                  <Navigate to="/mesto-react" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            ></Route>

            <Route
              path="/mesto-react"
              element={
                <ProtectedRoute
                  element={Main}
                  cards={cards}
                  onEditAvatar={() => {
                    handleEditAvatarClick();
                  }}
                  onEditProfile={() => {
                    handleEditProfileClick();
                  }}
                  onAddPlace={() => {
                    handleAddPlaceClick();
                  }}
                  onCardClick={(card) => {
                    handleCardClick(card);
                  }}
                  onCardLike={(card) => {
                    handleCardLike(card);
                  }}
                  onCardDelete={(card) => {
                    handleCardDelete(card);
                  }}
                  isLogIn={isLogIn}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register handleInfoTooltipClick={handleInfoTooltipClick} />
              }
            />
            <Route
              path="/sign-in"
              element={<Login handleLogin={handleLogin} />}
            />
          </Routes>
          <Footer />
          //*POPUPS //& edit profile
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopup}
            onUpdateUser={handleUpdateUser}
          ></EditProfilePopup>
          //& new place
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopup}
            onAddPlace={handleNewPlace}
          ></AddPlacePopup>
          //& are you sure?
          <PopupWithForm
            popupName="popup_delete-card-question"
            containerName="popup__container_delete-card"
            titleClassName="popup__title_delete-card-question"
            title="Вы уверены?"
            buttonClassName="popup__button-say-yes"
            buttonText="Да"
          ></PopupWithForm>
          //& new avatar
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopup}
            onUpdateAvatar={handleUpdateAvatar}
          ></EditAvatarPopup>
          <ImagePopup card={selectedCard} onClose={closeAllPopup} />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopup}
            isSuccessReg={isSuccessReg}
          ></InfoTooltip>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
