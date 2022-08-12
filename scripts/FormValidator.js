export class FormValidator {
  constructor(formSelectors, form) {
    this._formSelectors = formSelectors;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._formSelectors.inputSelector)
    );
    this._button = this._form.querySelector(
      this._formSelectors.submitButtonSelector
    );
  }

  enableValidation() {
    this._form.addEventListener('submit', () => {
      this._handleFormSubmit(event);
    });

    this._setEventListeners();
  }

  _handleFormSubmit(event) {
    event.preventDefault();
  }

  _setEventListeners() {
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._handleFormInput(input);
        this._setSubmitButtonState();
      });
    });
  }

  _setSubmitButtonState() {
    const isValid = this._form.checkValidity();

    if (isValid) {
      this._button.disabled = false;
      this._button.classList.remove(this._formSelectors.inactiveButtonClass);
    } else {
      this._button.disabled = true;
      this._button.classList.add(this._formSelectors.inactiveButtonClass);
    }
  }

  _handleFormInput(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _showInputError(input) {
    const errorInput = this._searchErrorLabel(input);

    errorInput.textContent = input.validationMessage;
    errorInput.classList.add(this._formSelectors.errorClass);

    input.classList.add(this._formSelectors.inputErrorClass);
  }

  _hideInputError(input) {
    this._searchErrorLabel(input).textContent = '';

    input.classList.remove(this._formSelectors.inputErrorClass);
  }

  _searchErrorLabel(input) {
    const inputName = input.getAttribute('name');
    const errorInput = document.getElementById(`${inputName}-error`);

    return errorInput;
  }

  resetValidation() {
    this._setSubmitButtonState();

    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
}
