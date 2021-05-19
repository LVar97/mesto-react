import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {

	const currentUser = React.useContext(CurrentUserContext);

	// Определяем, являемся ли мы владельцем текущей карточки
	const isOwn = props.card.owner._id === currentUser._id;

	// Создаём переменную, которую после зададим в `className` для кнопки удаления
	const cardDeleteButtonClassName = (
		`element__btn-delete ${isOwn ? 'element__btn-delete' : 'element__btn-delete_hidden'}`
	); 

	// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	const isLiked = props.card.likes.some(i => i._id === currentUser._id);

	// Создаём переменную, которую после зададим в `className` для кнопки лайка
	const cardLikeButtonClassName = (
		`element__btn-like ${isLiked ? 'element__btn-like_active' : 'element__btn-like'}`
	); 

	function handleClick() {
		props.onCardClick(props.card);
	} 

	function handleLikeClick() {
		props.onCardLike(props.card)
	}

	function handleDeleteClick() {
		props.onCardDelete(props.card)
	}

	return(
		<li className="element">
			<img src={props.card.link} alt="#" className="element__image" onClick={handleClick}/>
			<button className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="delete" type="button" />
			<div className="element__heading">
				<h2 className="element__title">{props.card.name}</h2>
				<div className="element__likes">
					<button className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="like" type="button" />
					<div className="element__btn-like_number">{props.card.likes.length}</div>
				</div>
			</div>
		</li>
	)
}
export default Card