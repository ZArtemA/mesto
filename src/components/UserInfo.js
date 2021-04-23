export class UserInfo {
    constructor({ profileNameSelector, profileJobSelector, profileAvatarSelector }) {
        this._profileNameSelector = profileNameSelector;
        this._profileJobSelector = profileJobSelector;
        this._profileAvatarSelector = profileAvatarSelector;
        this._name = document.querySelector(this._profileNameSelector);
        this._info = document.querySelector(this._profileJobSelector);
        this._avatar = document.querySelector(this._profileAvatarSelector);
    };

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._info.textContent,
            id: this._id,
            avatar: this._avatar.src
        };
    };

    setId(id) {
        this._id = id;
      }
 

    setUserInfo(newName, newInfo) {
            this._name.textContent = newName;
            this._info.textContent = newInfo;
    }

    setUserAvatar(newAvatar) {
        this._avatar.src = newAvatar;
    }
}