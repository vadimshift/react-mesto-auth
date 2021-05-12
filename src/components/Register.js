import Header from "./Header";
import Footer from "./Footer";
import { Link, useHistory } from "react-router-dom";
import * as apiAuth from "../utils/apiAuth";
import { useState } from "react";

function Register() {

  function handleSubmit(e) {
    e.preventDefault();
    apiAuth.register(email, password).then((res) => console.log(res))
    
  }


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hendleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const hendleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  

  return (
    <>
      <Header>
        <Link to='/sign-in' className="header__link">Войти</Link>
      </Header>
      <section className="auth-page">
        <h2 className="auth-page__title">Регистрация</h2>
        <form onSubmit={handleSubmit} className="auth-page__form" noValidate>
          <input
            type="email"
            className="auth-page__input"
            placeholder="Email"
            onChange={hendleChangeEmail}
          ></input>
          <input
            className="auth-page__input"
            placeholder="Пароль"
            type="password"
            onChange={hendleChangePassword}
          ></input>
          <button className="auth-page__submit-button" type="submit">
            Зарегистрироваться
          </button>
          <p className="auth-page__subtitle_type_register">
            Уже зарегистрированы?{" "}
            <Link to="/sign-in" className="auth-page__link">
              Войти
            </Link>
          </p>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default Register;
