import React from 'react';

class PopupWithForm extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<>
				<div className={`popup popup_${this.props.name} ${this.props.isOpen && 'popup_opened'}`}>
					<div className="popup__container">
					<h3 className="popup__title">{this.props.title}</h3>
						<form method="POST" name={this.props.name} className="popup__form" noValidate>
							{this.props.children}
							<button className="btn-submit" type="submit">Сохранить</button>
							<button className="popup__close" aria-label="Close" type="button" onClick={this.props.onClose}/>
						</form>
					</div>
				</div>
			</>
			
		);
		
	}
}
export default PopupWithForm;
