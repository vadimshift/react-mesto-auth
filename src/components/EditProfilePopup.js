import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const hendleChangeName = (e) => {
    setName(e.target.value);
  };

  const hendleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <input
        required
        minLength="2"
        maxLength="40"
        id="enterNameProfile"
        name="name"
        type="text"
        placeholder="Имя"
        className="popup__enter popup__enter_type_name"
        value={name || ""}
        onChange={hendleChangeName}
      />
      <span className="enterNameProfile-error popup__error-message"></span>
      <input
        required
        minLength="2"
        maxLength="200"
        id="enterAboutProfile"
        name="about"
        type="text"
        placeholder="О себе"
        className="popup__enter popup__enter_type_about"
        value={description || ""}
        onChange={hendleChangeDescription}
      />
      <span className="popup__error-message enterAboutProfile-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
