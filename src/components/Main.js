import { useState, useEffect } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Footer from "./Footer";
import api from "../utils/api";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function Main({ onLogout, userEmail }) {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    api
      .getProfileInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  const [cards, setCards] = useState([]);

  const handleAddPlaceSubmit = (data) => {
    api
      .setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  };

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    const setLikeCard = () => {
      api
        .setLikeCard(card._id, !isLiked)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    };

    const setDislikeCard = () => {
      api
        .delLikeCard(card._id, !isLiked)
        .then((newCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(`Ошибка ${err}`);
        });
    };

    isLiked ? setDislikeCard() : setLikeCard();
  }

  function handleCardDelete(card) {
    api
      .delCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  useEffect(() => {
    api
      .getCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  };

  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleUpdateAvatar = (data) => {
    api
      .setNewAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  };

  const handleUpdateUser = (data) => {
    api
      .setNewProfileInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  };

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const hendleLogout = () => {
    onLogout();
  };

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={userEmail}>
          <button onClick={hendleLogout} className="header__logout-button">
            Выйти
          </button>
        </Header>
        <main className="content">
          <section className="profile">
            <button
              type="button"
              onClick={handleEditAvatarClick}
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
                  onClick={handleEditProfileClick}
                  className="profile__edit-button"
                ></button>
              </div>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              type="button"
              onClick={handleAddPlaceClick}
              className="profile__add-button"
            ></button>
          </section>
          <section className="elements">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            ))}
          </section>
        </main>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <PopupWithForm
          name="submit-form"
          title="Вы уверены?"
          buttonTitle="Да"
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default Main;
