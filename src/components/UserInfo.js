export class UserInfo{
    constructor({userName, userInfo}){
    this._name = userName;
    this._info = userInfo;
    };
    getUserInfo(){
        return{
            name: this._name.textContent,
            info: this._info.textContent,
        };
    }
    setUserInfo(newName, newInfo){
        {
        this._name.textContent = newName;
        this._info.textContent = newInfo;
        }
    }
}