import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* if (!loginData.username || !loginData.password) {
      return;
    } */

    onLogin(loginData);
    /* .catch(err => setMessage(err.message || 'Что-то пошло не так')); */
  };

  return (
    <>
      <Header>
        <Link to="/sign-up" className="header__link">
          Регистрация
        </Link>
      </Header>
      <section className="auth-page">
        <h2 className="auth-page__title">Вход</h2>
        <form className="auth-page__form" onSubmit={handleSubmit}>
          <input
            id="email"
            required
            name="email"
            type="email"
            value={loginData.username}
            onChange={handleChange}
            className="auth-page__input"
            placeholder="Email"
          ></input>
          <input
            id="password"
            required
            name="password"
            type="password"
            autoComplete="current-password"
            value={loginData.password}
            onChange={handleChange}
            className="auth-page__input"
            placeholder="Пароль"
          ></input>
          <button className="auth-page__submit-button" type="submit">
            Войти
          </button>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default Login;
