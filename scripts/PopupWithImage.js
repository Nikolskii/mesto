import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._imageLink = this._popup.querySelector('.popup__image');
    this._imageCaption = this._popup.querySelector('.popup__caption');
  }

  open(name, link) {
    this._imageLink.src = link;
    this._imageLink.alt = name;
    this._imageCaption.textContent = name;

    super.open();
  }
}
