function Login() {
  return (
    <section className="">
      <h2 className="profile__title">Регистрация</h2>
      <form className="" noValidate >
        <input className="" placeholder="Email"></input>
        <input className="" placeholder="Пароль" type="password"></input>
        <button className="" type="button">Зарегистрироваться</button>
        <p className="profile__title">Уже зарегистрированы? <a href="#">Войти</a></p>
      </form>
    </section>
  );
}

export default Login;
