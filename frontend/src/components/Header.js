import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("jwt");
    props.handleLogout();
    navigate("/sign-in", { replace: true });
  }

  //*burger
  const [isBurgerMenuOpen, SetIsBurgerMenuOpen] = React.useState(false);
  const clickOnBurgerMenu = () => {
    SetIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <header className="header">
      <a
        href={location.pathname === "/mesto-react" ? "#!" : "/mesto-react"}
        className="button header__logo"
      ></a>
      <div
        className={`${
          isBurgerMenuOpen
            ? "header__menu-burger_active"
            : "header__menu-burger"
        }`}
        onClick={clickOnBurgerMenu}
      ></div>

      {props.isLogIn ? (
        <div
          className={`header__wrapper-menu ${
            isBurgerMenuOpen ? "header__wrapper-menu_active" : ""
          }`}
        >
          <div className="header__menu">
            <p className="header__menu-email">{props.userEmail}</p>
            <button className="button header__menu-exit" onClick={signOut}>
              Выход
            </button>
          </div>
        </div>
      ) : (
        <a
          href={location.pathname === "/sign-in" ? "/sign-up" : "/sign-in"}
          className="button header__sign-in"
        >
          {location.pathname === "/sign-in" ? "Регистрация" : "Войти"}
        </a>
      )}
    </header>
  );
}

export default Header;
