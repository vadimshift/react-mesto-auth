import logo from "../images/logo.svg";
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип проекта Место" />
      <p className="header__login-title">
        {props.userMail}
        <Link to={props.link} className="header__link" >
          {props.buttonTitle}
        </Link>
      </p>
    </header>
  );
}

export default Header;
