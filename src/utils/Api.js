export default class Api{
	constructor(options){
		this._url = options.baseUrl;
		this._token = options.token;
	}

	_handleResponse(res) {
		if (!res.ok) {
			return Promise.reject(`Error: ${res.status}`);
		}
		return res.json();
	}

	fetchCARDRender (url){
		return fetch( this._url+url , {
		headers: {
			authorization: this._token
		}
	})
	.then(this._handleResponse)
	.then((result) => {
		return result
	})
	}


	fetchUserInfo (url){
		return fetch(this._url+url, {
		headers: {
			authorization: this._token
		}
		})
		.then(this._handleResponse)
		.then((result) => {
			return result
		})

	}

	fetchSaveDataUserInfo(url, data){
		return fetch(this._url+url, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(data)
			
		})
		.then(this._handleResponse)
	}

	fetcAddhNewCard(url, data){
		
		return fetch(this._url+url, {
			method: 'POST',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(
				data
			)	
		})
		.then(this._handleResponse)
		.then(data => {return data})
	}


	fetchDeleteCard(url, id){
		return fetch(this._url+url+'/'+id, {
			method: 'DELETE',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
		})
		.then(this._handleResponse)
	}

	fetchAddLike(url, like, id){
		return fetch(this._url+url+'/'+ like +id, {
			method: 'PUT',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
		})
		.then(this._handleResponse)
	}

	fetchDeleteLike(url, like, id){
		return fetch(this._url+url+'/'+ like +id, {
			method: 'DELETE',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
		})
		.then(this._handleResponse)
	}

	fetchChangeAvatar(url, avatar, data ){
		return fetch(this._url + url + avatar, {
			method: 'PATCH',
			headers: {
				authorization: this._token,
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(
				{avatar: data.avatar }
			)
		})
		.then(this._handleResponse)
		.then(userAvatar => {
			return userAvatar;
	 	})
	}

	changeLikeCardStatus(card , like) {
		
		if (like === true){
			return api.fetchAddLike('cards', 'likes/', card)
		}else{
			return api.fetchDeleteLike('cards', 'likes/', card)
		}

	}
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-22/',
  token: 'e963337f-c00b-491f-a0af-9c9720f825f0'
});