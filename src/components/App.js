import React from 'react';
import '../index.css';
import Header from './Header'; 
import Main from './Main';
import Footer from './Footer'; 
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {api} from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: {},
      isImagePopupOpen: false,
      currentUser: '',
      cards: []
    }
  }
  
  
  componentDidMount(){
    api.fetchUserInfo('users/me')
    .then((res) => {
      this.setState({
        currentUser: res
			})
    })
    .catch((err) => console.log(err));
    api.fetchCARDRender('cards')
		.then((res) => {	
			this.setState({
        cards: res
      })
    })
		.catch((err) => console.log(err));
  }

  handleCardClick = (item) => {
    this.setState({
      selectedCard: item,
      isImagePopupOpen: true
    })
  }

  handleEditAvatarClick = () =>{
    this.setState({
      isEditAvatarPopupOpen: true,
    });
	}

	handleEditProfileClick = () => {
    this.setState({
      isEditProfilePopupOpen: true,
    });
	}

  handleAddPlaceClick = () => {
    this.setState({
      isAddPlacePopupOpen: true,
    });
	}

  closeAllPopups = () => {
    this.setState({
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: {},
      isImagePopupOpen: false
    })
  }

  handleUpdateUser = (data) => {
    api.fetchSaveDataUserInfo('users/me', data)
    .then((res) => 
      this.setState({
        isEditProfilePopupOpen: false,
        currentUser: res
      })
    )
    .catch((err) => console.log(err));
  }

  handleUpdateAvatar = (link) => {
    api.fetchChangeAvatar('users/me/', 'avatar', link)
    .then((res) => 
      this.setState({
        isEditAvatarPopupOpen: false,
        currentUser: res
      })
    )
    .catch((err) => console.log(err));
  }

  handleCardLike = (card) => {

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(el=> el._id === this.state.currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
		api.changeLikeCardStatus(card._id, !isLiked)
		.then((newCard) => { 
      this.setState({
        cards: this.state.cards.map((el) => el._id  === card._id ? newCard : el)
      })
		})
		.catch((err) => console.log(err));
		
	}

  handleCardDelete = (card) => {
		api.fetchDeleteCard('cards', card._id)
    .then(() => {
      this.setState({
        cards: this.state.cards.filter(function(el){
          return el._id !== card._id
        })
      })
    })
	}

  handleAddPlaceSubmit = (data) =>{
    api.fetcAddhNewCard('cards', data)
    .then((newCard) => 
      this.setState({
        isAddPlacePopupOpen: false,
        cards: ([newCard, ...this.state.cards])
      })
    )
  }

  render(){
  return (
    <div className="page">
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header />
        <Main 
        onEditAvatar={this.handleEditAvatarClick}
        onEditProfile={this.handleEditProfileClick}
        onAddPlace={this.handleAddPlaceClick}
        onCardClick={this.handleCardClick}
        cards={this.state.cards}
        onCardLike={this.handleCardLike}
        onCardDelete={this.handleCardDelete}/>
        <Footer />
        <EditProfilePopup onUpdateUser={this.handleUpdateUser} isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups} />
        <AddPlacePopup onAddPlace={this.handleAddPlaceSubmit} isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups}/>
        <EditAvatarPopup onUpdateAvatar={this.handleUpdateAvatar} isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups} />
        <PopupWithForm name="deletet" title="Вы уверены?">
          <div className="popup__wrapper">[props.children]</div>
        </PopupWithForm>
        <ImagePopup name="imgcard" card={this.state.selectedCard} onClose={this.closeAllPopups} isOpen={this.state.isImagePopupOpen}/>
      </CurrentUserContext.Provider>
    </div>

  );
  }
}

export default App;
