import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Место" />
      <p className="header__login-title">
        {props.userMail}
        <a className="header__link" href="#">
          {props.buttonTitle}
        </a>
      </p>
    </header>
  );
}

export default Header;
