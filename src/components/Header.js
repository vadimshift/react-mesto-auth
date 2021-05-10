import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Место" />
      <a className="header__link" href="#">
        Войти
      </a>
    </header>
  );
}

export default Header;
