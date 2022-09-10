import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popup, handleSubmitForm }) {
    super(popup);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._button = this._form.querySelector('.form__button');
    this._buttonText = this._button.textContent;
  }

  _getInputValues() {
    this._formValues = {};

    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', () => {
      this._handleSubmitForm(this._getInputValues());

      this.close();
    });
  }

  close() {
    super.close();

    this._form.reset();
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._button.textContent = 'Сохранение...';
    } else {
      this._button.textContent = this._buttonText;
    }
  }
}
