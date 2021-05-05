import { apiOptions } from "./constants";

class Api {
  constructor(apiOptions) {
    this._userUrl = apiOptions.userUrl;
    this._cardsUrl = apiOptions.cardsUrl;
    this._cardsUrlLike = apiOptions.cardsUrlLike;
    this._userAvatar = apiOptions.userAvatar;
    this._headers = apiOptions.headers;
  }

  _parseResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getCards() {
    return fetch(this._cardsUrl, {
      headers: this._headers,
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }

  getProfileInfo() {
    return fetch(this._userUrl, {
      headers: this._headers,
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }

  setNewProfileInfo(data) {
    return fetch(this._userUrl, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }

  setNewCard({ placeName, placeLink }) {
    return fetch(this._cardsUrl, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: placeName,
        link: placeLink,
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }

  delCard(id) {
    return fetch(`${this._cardsUrl}/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }

  setLikeCard(id) {
    return fetch(`${this._cardsUrlLike}/${id}`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }

  delLikeCard(id) {
    return fetch(`${this._cardsUrlLike}/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }

  setNewAvatar(data) {
    return fetch(this._userAvatar, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    })
      .then((res) => this._parseResponse(res))
      .catch((err) => Promise.reject(err));
  }
}

const api = new Api(apiOptions);

export default api;
