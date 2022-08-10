export class FormValidator {
  constructor(formSelectors, form) {
    this._form = form;
    this._formSelectors = formSelectors;
  }

  enableValidation() {
    const formNew = document.querySelector(this._form);
    formNew.addEventListener('submit', () => {
      this._handleFormSubmit(event);
    });

    this._setEventListeners(formNew);
  }

  _handleFormSubmit(event) {
    event.preventDefault();
  }

  _setEventListeners(formNew) {
    const inputList = Array.from(
      formNew.querySelectorAll(this._formSelectors.inputSelector)
    );
    const button = formNew.querySelector(
      this._formSelectors.submitButtonSelector
    );

    inputList.forEach((inputForm) => {
      inputForm.addEventListener('input', () => {
        this._handleFormInput(inputForm);
        this._setSubmitButtonState(button, formNew);
      });
    });
  }

  _setSubmitButtonState(button, formNew) {
    const isValid = formNew.checkValidity();

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
