export class FormValidator {
  constructor(formSelectors, form) {
    this._form = document.querySelector(form);
    this._formSelectors = formSelectors;
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
    const inputList = Array.from(
      this._form.querySelectorAll(this._formSelectors.inputSelector)
    );
    const button = this._form.querySelector(
      this._formSelectors.submitButtonSelector
    );

    inputList.forEach((inputForm) => {
      inputForm.addEventListener('input', () => {
        this._handleFormInput(inputForm);
        this._setSubmitButtonState(button);
      });
    });
  }

  _setSubmitButtonState(button) {
    const isValid = this._form.checkValidity();

    if (isValid) {
      button.disabled = false;
      button.classList.remove(this._formSelectors.inactiveButtonClass);
    } else {
      button.disabled = true;
      button.classList.add(this._formSelectors.inactiveButtonClass);
    }
  }

  _handleFormInput(inputForm) {
    if (!inputForm.validity.valid) {
      this._showInputError(inputForm);
    } else {
      this._hideInputError(inputForm);
    }
  }

  _showInputError(inputForm) {
    const errorInputForm = this._searchErrorLabel(inputForm);

    errorInputForm.textContent = inputForm.validationMessage;
    errorInputForm.classList.add(this._formSelectors.errorClass);

    inputForm.classList.add(this._formSelectors.inputErrorClass);
  }

  _hideInputError(inputForm) {
    this._searchErrorLabel(inputForm).textContent = '';

    inputForm.classList.remove(this._formSelectors.inputErrorClass);
  }

  _searchErrorLabel(inputForm) {
    const inputName = inputForm.getAttribute('name');
    const errorInputForm = document.getElementById(`${inputName}-error`);

    return errorInputForm;
  }
}
