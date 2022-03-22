export const BASE_URL = 'https://api.shcherbinanick.mesto.nomoredomains.work'

export const register = (userData) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  }).then((response) => {
    if (response.status === 201) {
      return response.json()
    }
    return Promise.reject(`Ошибка ${ response.status }`)

  })
}

export const login = (userData) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  }).then((response) => {
    if (response.status === 200) {
      return response.json()
    }
    return Promise.reject(`Ошибка ${ response.status }`)
  })
}

export const logout = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  .then((response) => {
    if (response.status === 200) {
      return response.json()
    }
    return Promise.reject(`Ошибка ${ response.status }`)
  })
}