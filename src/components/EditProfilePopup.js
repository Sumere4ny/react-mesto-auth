import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="edit-profile"
      title="Редактировать профиль">
      <input type="text" className="popup__input popup__input_name-field" id="name"
        name="name" minLength="2" maxLength="40" value={name}
        onChange={handleNameChange} required />
      <span id='name-error' className='popup__input-error'></span>
      <input type="text" className="popup__input popup__input_profession" id="profession"
        name="about" minLength="2" maxLength="200" value={description}
        onChange={handleDescriptionChange} required />
      <span id='profession-error' className='popup__input-error'></span>
      <button type="submit" className="popup__submit">Сохранить</button>
    </PopupWithForm>
  );
}

export default EditProfilePopup
