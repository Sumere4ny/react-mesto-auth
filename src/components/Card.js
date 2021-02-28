import React from 'react';
import likeButton from '../images/like-button.svg';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = `cards__like-button ${isLiked ? 'cards__like-button_active' : ''}`;

  const cardDeleteButtonClassName = `cards__remove-button ${isOwn ? '' : 'cards__remove-button_hidden'}`;


  function handleCardClick() {
    props.onClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleCardDelete() {
    props.onCardDelete(props.card)
  }

  return (
    <div className="cards__item">
      <img className="cards__image" src={props.card.link} alt={props.card.name} onClick={handleCardClick} />
      <button className={cardDeleteButtonClassName} type="button" onClick={handleCardDelete} />
      <div className="cards__description">
        <h2 className="cards__title">{props.card.name}</h2>
        <div className="cards__like-container">
          <img src={likeButton} className={cardLikeButtonClassName} alt="Лайк" onClick={handleLikeClick} />
          <span className="cards__like-number">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
