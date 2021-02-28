import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
        </div>
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" onClick={props.onEditProfile} type="button" />
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" onClick={props.onAddPlace} type="button" />
      </section>

      <section className="cards">
        {props.cards.map(item =>
          (<Card key={item._id} card={item}
            onClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />)
          )}
      </section>
    </main>
  );
}

export default Main;
