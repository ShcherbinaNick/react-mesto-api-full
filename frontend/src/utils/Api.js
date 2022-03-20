class Api{
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }
  _onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
  }  
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
    .then(this._onResponse)
  }
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
    .then(this._onResponse)
  }
  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._onResponse)
  }
  setAvatar(link) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
        })
    })
    .then(this._onResponse)
  }
  setCardLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then(this._onResponse)
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._onResponse)
    } else {
      return fetch(`${this._url}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._onResponse)
    }
  }
  removeCardLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._onResponse)
  }
  postCard(newCard) {
    return fetch(`${this._url}/cards`, {
      method:  "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newCard.name,
        link: newCard.link
        })
    })
    .then(this._onResponse)
  }
  removeCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(this._onResponse)
  }
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-30',
  headers: {
    authorization: '47f8c499-4c8d-4d07-9fbb-42aad97eb271',
    'Content-Type': 'application/json'
  }
});

export default api;
