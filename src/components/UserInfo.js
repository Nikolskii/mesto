export default class UserInfo {
  constructor(data) {
    this._userName = document.querySelector(data.name);
    this._userAbout = document.querySelector(data.about);
    this._userAvatar = document.querySelector(data.avatar);
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

  setUserId(id) {
    this._userId = id;
  }

  getUserId() {
    return this._userId;
  }
}
