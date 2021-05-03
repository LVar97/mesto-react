import React from 'react';
import {api} from '../utils/Api';
import Card from './Card';

class Main extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			userName: '', 
			userDescription: '',
			userAvatar: '',
			cards: []
		}
	}

	componentDidMount(){
		api.fetchUserInfo('users/me')
		.then((res) => {
			this.setState({
				userAvatar: res.avatar,
				userName: res.name,
				userDescription: res.about
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
	
	
	render(){
		return(
			<main className="content">
				<section className="profile">
					<div className="profile__ava-overlay" onClick={this.props.onEditAvatar}/>
					<img src={this.state.userAvatar} alt="аватар" className="profile__avatar" />
					<div className="profile__info">
						<h1 className="profile__title">{this.state.userName}</h1>
						<p className="profile__subtitle">{this.state.userDescription}</p>
						<button className="profile__btn-edit" aria-label="edit profile" type="button" onClick={this.props.onEditProfile}/>
					</div>
					<button className="profile__btn-add" aria-label="add cards" type="button" onClick={this.props.onAddPlace}/>
				</section>
				<section className="elements">
					<ul className="elements__list">
						{this.state.cards.map((card) =>
							<Card card={card}
							onCardClick={this.props.onCardClick} key={card._id}/>
						)}
					</ul>	
				</section>
			</main>
		);
	}
}

export default Main;