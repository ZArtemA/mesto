export class UserInfo{
    constructor({userName, userInfo}){
    this._name = userName;
    this._info = userInfo;
    };
    getUserInfo(){
        return{
            returnName: this._name.textContent,
            returnInfo: this._info.textContent,
        };
    }
    setUserInfo(newName, newInfo){
        {
        this._name.textContent = newName;
        this._info.textContent = newInfo;
        }
    }
}