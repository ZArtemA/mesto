export class Api {
    constructor({address, token, groupID}) {
        this._address = address;
        this._token = token;
        this._groupID = groupID;
    }

    getInitialCards() {
        return fetch(`${this._address}/v1/${this._groupID}/cards`, {
            headers: {
                authorization: this._token
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        });
    }

    
    addCard(data){
        return fetch(`${this._address}/v1/${this._groupID}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(response => response.ok
                ? response.json()
                : Promise.reject(`Ошибка ${response.status}`))
    }


    removeCard(_id) {
        return fetch(`${this._address}/v1/${this._groupID}/cards/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(response => response.ok
            ? Promise.resolve('success')
            : Promise.reject(`Ошибка ${response.status}`))
        }

        
    likeCard(_id) {
        return fetch(`${this._address}/v1/${this._groupID}/cards/likes/${_id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        });
    }

      deleteLikeCard(_id) {
        return fetch(`${this._address}/v1/${this._groupID}/cards/likes/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
            .then(response => response.ok
                ? Promise.resolve('success')
                : Promise.reject(`Ошибка ${response.status}`))
    }


    getPersonInfo() {
        return fetch(`${this._address}/v1/${this._groupID}/users/me`, {
            headers: {
                authorization: this._token
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        });
    }


    patchPersonInfo(data) {
        return fetch(`${this._address}/v1/${this._groupID}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        });
    }

    patchAvatar(avatar) {
        return fetch(`${this._address}/${this._groupID}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                avatar
            })
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        });

    }

    

}