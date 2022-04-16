class Api{
  constructor({baseUrl, headers}) {
    this._url = baseUrl;
    this._headers = headers;
  }
  _onResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }  
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._onResponse)
  }
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._onResponse)
  }
  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      credentials: 'include',
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
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
        })
    })
    .then(this._onResponse)
  }
  setCardLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._onResponse)
  }
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        credentials: 'include',
        headers: this._headers,
      }).then(this._onResponse)
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "PUT",
        credentials: 'include',
        headers: this._headers,
      }).then(this._onResponse)
    }
  }
  removeCardLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._onResponse)
  }
  postCard(newCard) {
    return fetch(`${this._url}/cards`, {
      method:  "POST",
      credentials: 'include',
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
      credentials: 'include',
      headers: this._headers,
    })
    .then(this._onResponse)
  }
}

const api = new Api({
  baseUrl: 'https://api.shcherbinanick.mesto.nomoredomains.work',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;

