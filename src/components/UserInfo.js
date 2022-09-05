export default class UserInfo {
  constructor(data) {
    this._userName = data.userName;
    this._userAbout = data.userAbout;
    this._userAvatar = data.userAvatar;
  }

  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    };

    return userData;
  }

  setUserInfo(configProfile) {
    this._userName.textContent = configProfile.name;
    this._userAbout.textContent = configProfile.about;
    this._userAvatar.src = configProfile.avatar;
  }
}
