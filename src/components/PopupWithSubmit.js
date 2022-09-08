import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor({ popup, handleSubmit }) {
    super(popup);
    this._handleSubmit = handleSubmit;
  }

  handleSubmitRedefinition(submitConfirm) {
    this._handleSubmit = submitConfirm;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.querySelector('.form__button').addEventListener('click', () => {
      this._handleSubmit();

      this.close();
    });
  }

  close() {
    super.close();
  }
}
