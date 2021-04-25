import React from 'react';
import ProtectedRoute from './ProtectedRoute';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { auth } from '../utils/auth';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { InfoTooltipContext, infoTooltipCaptions } from '../contexts/infoTooltipContext';
import avatar from '../images/avatar.jpg';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoTooltipContext, setInfoTooltipContext] = React.useState('fail');
  const [email, setEmail] = React.useState('');
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({
    name: '',
    about: '',
    avatar: avatar
  });
  const [cards, setCards] = React.useState([]);


  React.useEffect(() => {
    function tokenCheck() {
      const jwt = localStorage.getItem('token');
      if (jwt) {
        auth.getUserLoginInfo(jwt)
          .then(res => {
            if (res) {
              setEmail(res.email);
              history.push('/');
              handleLogin();
            }
          })
          .catch(err => console.log(err))
      }
    }
    tokenCheck();
  }, [loggedIn, history]);

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

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function handleLoginFormSubmit(email, password) {
    auth.signIn(password, email)
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          handleLogin();
          history.push('/');
        }
      })
      .catch(() => {
        setInfoTooltipContext('fail');
        handleInfoTooltipOpen();
      })
  }

  function handleRegisterFormSubmit(email, password) {
    auth.signUp(password, email)
      .then(res => {
        if (res) {
          setInfoTooltipContext('success');
          history.push('/sign-in');
        } else {
          setInfoTooltipContext('fail');
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        handleInfoTooltipOpen();
      })
  }

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
    setIsInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header email={email} isLoggedIn={loggedIn} onLogout={handleLogout} />

        <Switch>
        <ProtectedRoute
            exact path="/"
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike} />

          <Route path='/sign-in'>
            <Login onSubmit={handleLoginFormSubmit} />
          </Route>

          <Route path='/sign-up'>
            <Register onSubmit={handleRegisterFormSubmit} />
          </Route>

        </Switch>

        {loggedIn && <Footer />}

      </div>

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
        onAddPlace={handleUpdateCards}
      />

      <PopupWithForm
        name="delete-card"
        title="Вы уверены">
        <button type="submit" className="popup__submit popup__submit-confirm">Да</button>
      </PopupWithForm>

      <InfoTooltipContext.Provider value={infoTooltipCaptions[infoTooltipContext]}>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          loggedIn={loggedIn}
        />
      </InfoTooltipContext.Provider>

      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />

    </CurrentUserContext.Provider>
  );
}

export default App;
