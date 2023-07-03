import React from "react";
import { authorize } from "../../utils/Auth";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValue.email || !formValue.password) {
      return;
    }
    authorize(formValue.email, formValue.password)
      .then((data) => {
        if (data.token) {
          setFormValue({ email: "", password: "" });
          props.handleLogin();
          navigate("/mesto-react", { replace: true });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="sign-in">
      <h3 className="title sign-in__title">Вход</h3>
      <form
        action="#"
        className="sign-in__form"
        name="sign-in-form"
        onSubmit={handleSubmit}
      >
        <input
          id="sign-in-input-email"
          className="input sign-in__input"
          type="e-mail"
          name="email"
          required
          placeholder="Email"
          minLength="2"
          maxLength="40"
          value={formValue.email}
          onChange={handleChange}
        />
        <span id="sign-in-input-email-error" className="popup__error"></span>
        <input
          id="sign-in-input-pass"
          className="input sign-in__input"
          type="password"
          name="password"
          required
          placeholder="Пароль"
          value={formValue.password}
          onChange={handleChange}
        />
        <span id="sign-in-input-pass-error" className="popup__error"></span>
        <button className="button sign-in__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
