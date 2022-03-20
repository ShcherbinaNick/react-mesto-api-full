import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {

  const history = useHistory();

  const [ isLoggedIn, setIsLoggedIn ] = React.useState(false);
  const [ isSignUpSuccessful, setIsSignUpSuccessful ] = React.useState(false);

  const [ cards, setCards ] = React.useState([]);
  const [ selectedCard, setSelectedCard] = React.useState({ name: '', link: ''});
  
  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ isInfoTooltipOpen, setIsInfoTooltipOpen ] = React.useState(false);
  
  const [ currentUser, setCurrentUser ] = React.useState({
    'name': '',
    'avatar': '',
    'about': '',
    '_id': '',
    'cohort': '',
    'email': ''
  });

  const [ userEmail, setUserEmail ] = React.useState("")

  const handleRegistration = (values) => {
    auth.register(values)
    .then((res) => {
      if (res.data._id) {
        setIsSignUpSuccessful(true)
        setIsInfoTooltipOpen(true)
        history.push("/sign-in")
      } else {
        setIsInfoTooltipOpen(true)
      }
    })
    .catch((err) => {
      setIsSignUpSuccessful(false)
      setIsInfoTooltipOpen(true)
      console.log(err)
    })
  }

  const handleLogin = (values) => {
    auth.login(values)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true)
        history.push("/")
        setUserEmail(values.email)
      } else {
        setIsInfoTooltipOpen(true)
      }
    })
    .catch((err) => {
      console.log(err)
      setIsInfoTooltipOpen(true)
    })
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt')
      if (jwt) {
        auth.getContent(jwt)
      .then((res) => {
        if (res) {
          setIsLoggedIn(true)
          history.push("/")
          setUserEmail(res.data.email)
        } else {
          localStorage.removeItem('jwt')
        }
      })
      .catch((err) => {
        console.log(err)
      })   
      }
  }

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c))
      })
      .catch(err => console.log(err));
  } 

  const handleCardDelete = (card) => {
    api.removeCard(card._id)
    .then(() => {
      setCards(() => cards.filter(c => c._id !== card._id))
    })
    .catch(err => console.log(err))
  }

  const handleAddPlaceSubmit = (card) => {
    api.postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    tokenCheck();
    Promise.all([ api.getUserInfo(), api.getInitialCards() ])
      .then(([ user, newCards ]) => {
        setCurrentUser(user);
        setCards(newCards);
      })
      .catch(err => console.log(err))
  }, [])

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ name: '', link: ''});
    setIsInfoTooltipOpen(false);
  }
  
  useEffect(() => {
    const handleEscClose = e => {
      if (e.key === "Escape") {
        closeAllPopups()
      }
    }
    window.addEventListener("keydown", handleEscClose)
    return () => {
      window.removeEventListener("keydown", handleEscClose)
    }

  }, [ isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isInfoTooltipOpen, closeAllPopups ])

  function handleClickOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
      closeAllPopups()
    }
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }
  
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  const handleCardClick = (cardData) => {
    setSelectedCard(cardData)
  }


  const handleUpdateUser = (newUserInfo) => {
    api.setUserInfo(newUserInfo)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  const handleUpdateAvatar = (avatar) => {
    api.setAvatar(avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      <div className="App">
        <div className="page">
          <Header onLogOut={ setIsLoggedIn } userEmail={ userEmail }/>
            <Switch>
              <ProtectedRoute 
                exact path="/" 
                loggedIn={ isLoggedIn } 
                component={ Main } 
                onEditAvatarClick={ handleEditAvatarClick }
                onEditProfileClick={ handleEditProfileClick }
                onAddPlaceClick={ handleAddPlaceClick }
                onCardClick={ handleCardClick }
                cards={ cards }
                onCardLike={ handleCardLike }
                onCardDelete={ handleCardDelete }>
              </ProtectedRoute>
              <Route path="/sign-up">
                <Register onSubmit={ handleRegistration } />
              </Route>
              <Route path="/sign-in">
                <Login onSubmit={ handleLogin } />
              </Route>
            </Switch>
          <Footer />
          <EditAvatarPopup isOpen={ isEditAvatarPopupOpen } onClose={ closeAllPopups } overlayClose={ handleClickOverlay } onUpdateAvatar={ handleUpdateAvatar } />
          <EditProfilePopup isOpen={ isEditProfilePopupOpen } onClose={ closeAllPopups } overlayClose={ handleClickOverlay } onUpdateUser={ handleUpdateUser } />
          <AddPlacePopup isOpen={ isAddPlacePopupOpen } onClose={ closeAllPopups } overlayClose={ handleClickOverlay } onAddplaceSubmit={ handleAddPlaceSubmit }/>
          <ImagePopup onClose={ closeAllPopups } overlayClose={ handleClickOverlay } card={ selectedCard }/>
          <InfoTooltip isOpen={ isInfoTooltipOpen } onClose={ closeAllPopups } isSuccess={ isSignUpSuccessful } />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
