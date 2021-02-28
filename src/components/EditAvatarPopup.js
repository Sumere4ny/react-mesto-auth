import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    e.target.reset();
  }

  return(
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="edit-avatar"
      title="Обновить аватар">
      <input type="url" className="popup__input popup__input_avatar-link" id="avatar-link"
        name="link" placeholder="Ссылка на аватар" ref={avatarRef} required />
      <span id='avatar-link-error' className='popup__input-error'></span>
      <button type="submit" className="popup__submit">Сохранить</button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup
