import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import avatar from '../images/avatar.jpg';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: avatar
  });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getProfileData(), api.getInitialCards()])
      .then(([user, initialCards]) => {
          setCurrentUser(user);
          setCards([...initialCards]);
      })
      .catch(err => console.log(err));
  }, [])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  function handleUpdateAvatar(data){
    api.editAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(data) {
    api.setProfileData(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateCards(data) {
    api.createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    (!isLiked ? api.putLike(card._id) : api.deleteLike(card._id))
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch(err => console.log(err));
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />

        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
        />

        <Footer />

      </div>

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleUpdateCards}/>

      <PopupWithForm
        name="delete-card"
        title="Вы уверены">
        <button type="submit" className="popup__submit popup__submit-confirm">Да</button>
      </PopupWithForm>

      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
