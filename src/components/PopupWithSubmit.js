import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({ popup, handleSubmit }) {
    super(popup);
    this._handleSubmit = handleSubmit;
    this._button = this._popup.querySelector('.popup__button');
  }

  handleSubmitRedefinition(submitConfirm) {
    this._handleSubmit = submitConfirm;
  }

  setEventListeners() {
    super.setEventListeners();

    this._button.addEventListener('click', () => {
      this._handleSubmit();

      this.close();
    });
  }

  close() {
    super.close();
  }
}
