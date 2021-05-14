import succes from "../images/popup_succes.svg";
import fail from "../images/popup_fail.svg";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup_type_infoTooltip  ${
        props.isOpen ? "popup_active" : ""
      }`}
    >
      <div className="popup__container">
            <img className="popup__auth-img" src={succes} />
          <p className="popup__auth-title">Вы успешно зарегистрировались!</p> 
          {/* <img className="popup__auth-img" src={fail} />
          <p className="popup__auth-title">Что-то пошло не так! Попробуйте ещё раз.</p>  */}
        <button
          type="button"
          onClick={props.onClose}
          className={`popup__close-button popup__close-button_type_${props.name}`}
        ></button>
      </div>
    </section>
  );
}

export default InfoTooltip;
