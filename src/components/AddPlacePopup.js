import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const inputName = React.useRef();
  const inputLink = React.useRef();

  function handleSubmit(e){
    e.preventDefault();
    props.onAddPlace({
      name: inputName.current.value,
      link: inputLink.current.value
    });
  }

  return(
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="add-new-card"
      title="Новое место">
      <input type="text" className="popup__input popup__input_place-name" id="place-name"
        name="name" placeholder="Название" minLength="2" maxLength="30" ref={inputName} required />
      <span id='place-name-error' className='popup__input-error'></span>
      <input type="url" className="popup__input popup__input_place-link" id="place-link"
        name="link" placeholder="Ссылка на картинку" ref={inputLink} required />
      <span id='place-link-error' className='popup__input-error'></span>
      <button type="submit" className="popup__submit">Создать</button>
    </PopupWithForm>
  )
}

export default AddPlacePopup
