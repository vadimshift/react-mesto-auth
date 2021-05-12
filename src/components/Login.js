import Header from './Header';
import Footer from './Footer';
import { Link, useHistory } from "react-router-dom";

function Login() {
  return (
    <>
      <Header>
        <Link to='/sign-up' className="header__link">Регистрация</Link>
      </Header>
        <section className="auth-page">
          <h2 className="auth-page__title">Вход</h2>
          <form className="auth-page__form" noValidate>
            <input
              type="email"
              className="auth-page__input"
              placeholder="Email"
            ></input>
            <input
              className="auth-page__input"
              placeholder="Пароль"
              type="password"
            ></input>
            <button className="auth-page__submit-button" type="button">
              Войти
            </button>
          </form>
        </section>
        <Footer />
    </>
  );
}

export default Login;
