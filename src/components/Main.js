import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          type="button"
          onClick={props.onEditAvatar}
          className="profile__avatar-edit-button"
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="фотография профиля"
          />
        </button>
        <div className="profile__info-container">
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              type="button"
              onClick={props.onEditProfile}
              className="profile__edit-button"
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          type="button"
          onClick={props.onAddPlace}
          className="profile__add-button"
        ></button>
      </section>
      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
