export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_opened');

    document.addEventListener('keydown', () => {
      this._handleEscClose();
    });
  }

  closePopup() {
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose() {
    if (event.key === 'Escape') {
      this.closePopup();
    }
  }

  setEventListeners() {}
}
