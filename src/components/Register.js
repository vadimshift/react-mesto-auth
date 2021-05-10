import Header from "./Header";
import Footer from "./Footer";

function Register() {
  return (
    <>
      <Header />
      <section className="auth-page">
        <h2 className="auth-page__title">Регистрация</h2>
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
            Зарегистрироваться
          </button>
          <p className="auth-page__subtitle_type_register">
            Уже зарегистрированы?{" "}
            <a className="auth-page__link" href="#">
              Войти
            </a>
          </p>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default Register;
