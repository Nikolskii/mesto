export default class UserInfo {
  constructor(data) {
    this._userName = data.userName;
    this._userDescription = data.userDescription;
  }

  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      description: this._userDescription.textContent,
    };

    return userData;
  }

  setUserInfo(configProfile) {
    this._userName.textContent = configProfile.name;
    this._userDescription.textContent = configProfile.description;
  }
}
