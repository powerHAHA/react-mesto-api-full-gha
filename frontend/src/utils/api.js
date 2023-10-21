const apiOptions = {
	url: ''
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

	// Получение данных о пользователе с сервера
	getUserData() {
		return this._request(`${this._url}/users/me`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-type': 'application/json'
			},
		})
	}

	// Отправка полученных данных о пользователе на сервер
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

	// Смена аватара пользователя
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

	// Добавление новой карточки на сервер
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

	// Загрузка карточек с сервера
	getCards() {
		return this._request(`${this._url}/cards`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-type': 'application/json'
			},
		})
	}

	// Удаление карточки
	deleteCard(cardId) {
		return this._request(`${this._url}/cards/${cardId}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-type': 'application/json'
			},
		})
	}

	// Постановка лайка
	putLike(cardId) {
		return this._request(`${this._url}/cards/${cardId}/likes`, {
			method: 'PUT',
			headers: {
				'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
				'Content-type': 'application/json'
			},
		})
	}

	// Удаление лайка
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