import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'} popup_type_lightbox`}>
      <div className="lightbox">
          <button
            className="popup__close-button"
            type="button"
            onClick={props.onClose}
            aria-label="Закрыть"
          />
          <img className="lightbox__image"
            src={props.card.link} alt={props.card.name} />
          <h2 className="lightbox__image-title">{props.card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup
