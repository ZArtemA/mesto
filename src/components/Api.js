export class Api {
    constructor({address, token, groupID}) {
        this._address = address;
        this._token = token;
        this._groupID = groupID;
        this._getResJson = this._getResJson.bind(this);
    }

    _getResData (response) {
        if(response.ok) {
            return Promise.resolve("done");
        }
        return Promise.reject(new Error(`Ошибка: ${response.status}`));
    }

    _getResJson (response) {
        if(response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(`Ошибка: ${response.status}`));
    }


    getInitialCards() {
        return fetch(`${this._address}/v1/${this._groupID}/cards`, {
            headers: {
                authorization: this._token
            }
        }).then(response => {
        return this._getResJson(response);
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
        .then(response => {
            return this._getResJson(response);
        })
    }

    removeCard(_id) {
        return fetch(`${this._address}/v1/${this._groupID}/cards/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(response => {
            return this._getResData(response);
        })
    }

        
    likeCard(_id) {
        return fetch(`${this._address}/v1/${this._groupID}/cards/likes/${_id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token
            }
        })
        .then(response => {
            return this._getResJson(response);
        });
    }

      deleteLikeCard(_id) {
        return fetch(`${this._address}/v1/${this._groupID}/cards/likes/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
        .then(response => {
            return this._getResData(response);
        })
    }


    getPersonInfo() {
        return fetch(`${this._address}/v1/${this._groupID}/users/me`, {
            headers: {
                authorization: this._token
            }
        }).then(response => {
            return this._getResJson(response);
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
            return this._getResJson(response);
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
            return this._getResJson(response);
        });
    }
}