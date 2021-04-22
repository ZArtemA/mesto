export class UserInfo {
    constructor({ userName, userInfo, userAvatar }) {
        this._name = userName;
        this._info = userInfo;
        this._avatar = userAvatar;
    };
    getUserInfo(data) {
        return {
            name: data.name,
            about: data.about,
            id: data._id,
            image: data.avatar
        };
    }

    setUserInfo(newName, newInfo) {
        {
            this._name.textContent = newName;
            this._info.textContent = newInfo;
        }
    }

    setUserAvatar(newAvatar) {
        this._avatar.src = newAvatar;
    }
}