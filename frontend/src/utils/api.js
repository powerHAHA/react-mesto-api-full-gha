const apiOptions = {
	url: 'https://api.d-snytko.nomoredomainsrocks.ru'
}

class Api {
	constructor(config) {
		this._url = config.url;
		this._headers = config.headers;
	}

	_handleResponse(res) {
		if (res.ok) {
			return res.json();
		} else {
			return Promise.reject(`Возникла ошибка: ${res.status}`)
		}
	}

	_request(url, options) {
		return fetch(url, options).then(this._handleResponse)
	}

	getUserData() {
		return this._request(`${this._url}/users/me`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-type': 'application/json'
			},
		})
	}

	sendUserData(userData) {
		return this._request(`${this._url}/users/me`, {
			method: 'PATCH',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				name: userData.name,
				about: userData.about
			})
		})
	}

	sendAvatarData(userAvatar) {
		return this._request(`${this._url}/users/me/avatar`, {
			method: 'PATCH',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				avatar: userAvatar.avatar
			})
		})
	}

	addNewCard({ name, link }) {
		return this._request(`${this._url}/cards`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-type': 'application/json'
			},
			body: JSON.stringify({ name, link })
		})
	}

	getCards() {
		return this._request(`${this._url}/cards`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-type': 'application/json'
			},
		})
	}

	deleteCard(cardId) {
		return this._request(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-type': 'application/json'
			},
		})
	}

	putLike(cardId) {
		return this._request(`${this._url}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-type': 'application/json'
			},
		})
	}

	deleteLike(cardId) {
		return this._request(`${this._url}/cards/${cardId}/likes`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-type': 'application/json'
			},
		})
	}

	changeLikeCardStatus(cardId, isLiked) {
		if (isLiked) {
			return this.deleteLike(cardId);
		} else {
			return this.putLike(cardId);
		}
	}
}

export const api = new Api(apiOptions);