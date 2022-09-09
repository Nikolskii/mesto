export default class UserInfo {
  constructor(data) {
    this._userName = data.userName;
    this._userAbout = data.userAbout;
    this._userAvatar = data.userAvatar;
    this._userId = null;
  }

  getUserInfo() {
    const userData = {
      name: this._userName.textContent,
      about: this._userAbout.textContent,
    };

    return userData;
  }

  setUserInfo({ name, about, avatar }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    if (avatar) {
      this._userAvatar.src = avatar;
    }
  }

  getUserId(id) {
    if (id) {
      this._userId = id;
    }
    return this._userId;
  }
}
