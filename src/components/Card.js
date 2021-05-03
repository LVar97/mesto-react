function Card(props) {
	
	function handleClick() {
		props.onCardClick(props.card);
	} 
	
	return(
		<li className="element">
			<img src={props.card.link} alt="#" className="element__image" onClick={handleClick}/>
			<button className="element__btn-delete" aria-label="delete" type="button" />
			<div className="element__heading">
				<h2 className="element__title">{props.card.name}</h2>
				<div className="element__likes">
					<button className="element__btn-like" aria-label="like" type="button" />
					<div className="element__btn-like_number">{props.card.likes.length}</div>
				</div>
			</div>
		</li>
	)
}

export default Card