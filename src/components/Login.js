function Login() {
  return (
    <section className="auth-page">
      <div className="auth-page__container">
        <h2 className="auth-page__title">Регистрация</h2>
        <form className="auth-page__form" noValidate>
          <input className="auth-page__input" placeholder="Email"></input>
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
            <a className="auth-page__register-link" href="#">
              Войти
            </a>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
