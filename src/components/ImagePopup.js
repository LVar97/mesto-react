import React from 'react';

class ImagePopup extends React.Component{
	constructor(props){
		super(props);
	}
	
	render(){
		return(
			<>
				<div className={`popup popup_${this.props.name} ${this.props.isOpen && 'popup_opened'}`}>
					<div className="popup__content">
						<button className="popup__close" aria-label="Close" type="button" onClick={this.props.onClose}/>
						<img src={this.props.card.link} alt={this.props.card.name} className="popup__image" />
						<h2 className="popup__subtitle">{this.props.card.name}</h2>
					</div>
				</div>
			</>
			
		);
		
	}
}
export default ImagePopup;