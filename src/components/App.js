import React from 'react';
import '../index.css';
import Header from './Header'; 
import Main from './Main'; 
import Footer from './Footer'; 
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false,
      selectedCard: {},
      isImagePopupOpen: false
    }
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

  render(){
  return (
    <div className="page">
      <Header />
      <Main 
      onEditAvatar={this.handleEditAvatarClick}
      onEditProfile={this.handleEditProfileClick}
      onAddPlace={this.handleAddPlaceClick}
      onCardClick={this.handleCardClick}/>
      <Footer />
      <PopupWithForm name="edit" title="Редактировать профиль" isOpen={this.state.isEditProfilePopupOpen} onClose={this.closeAllPopups}>
        {/* <div className="popup__container"> */}
        <input id="name-input" type="text" placeholder="Имя" name="name" className="popup__field-name popup-input " required minLength={2} maxLength={40} />
        <span className="name-input-error popup__input-error" />
        <input id="job-input" type="text" placeholder="О себе" name="about" className="popup__field-work popup-input" required minLength={2} maxLength={200} />
        <span className="job-input-error popup__input-error" />
        {/* </div> */}
      </PopupWithForm>
      <PopupWithForm name="add" title="Новое место" isOpen={this.state.isAddPlacePopupOpen} onClose={this.closeAllPopups}>
        <input id="place-input" type="text" placeholder="Название" name="name" className="popup__field-place popup-input" required minLength={2} maxLength={30} />
        <span className="place-input-error popup__input-error" />
        <input id="link-input" type="url" placeholder="Ссылка на картинку" name="link" className="popup__field-link popup-input" required />
        <span className="link-input-error popup__input-error" />
      </PopupWithForm>
      <PopupWithForm name="avatar" title="Обновить аватар" isOpen={this.state.isEditAvatarPopupOpen} onClose={this.closeAllPopups}>
          <input id="avatar-input" type="url" placeholder="Аватар" name="avatar" className="popup__field-avatar popup-input" required />
          <span className="avatar-input-error popup__input-error" />
      </PopupWithForm>
      <PopupWithForm name="deletet" title="Вы уверены?">
        <div className="popup__wrapper">[props.children]</div>
      </PopupWithForm>
      <ImagePopup name="imgcard" card={this.state.selectedCard} onClose={this.closeAllPopups} isOpen={this.state.isImagePopupOpen}/>
      
    </div>

  );
  }
}

export default App;
