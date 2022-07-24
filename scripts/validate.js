const formItemsSelectors = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

function enableValidation(configForm) {
  const formList = Array.from(
    document.querySelectorAll(configForm.formSelector)
  );

  formList.forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);

    setEventListeners(form, configForm);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();
}

function setEventListeners(form, configForm) {
  const inputList = Array.from(form.querySelectorAll(configForm.inputSelector));
  const button = form.querySelector(configForm.submitButtonSelector);

  inputList.forEach((inputForm) => {
    inputForm.addEventListener('input', function () {
      handleFormInput(inputForm, configForm);
      setSubmitButtonState(button, form);
    });
  });
}

function setSubmitButtonState(button, form) {
  const isValid = form.checkValidity();

  if (isValid) {
    button.disabled = false;
    button.classList.remove(formItemsSelectors.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(formItemsSelectors.inactiveButtonClass);
  }
}

function handleFormInput(inputForm, configForm) {
  if (!inputForm.validity.valid) {
    showInputError(inputForm, configForm);
  } else {
    hideInputError(inputForm, configForm);
  }
}

function showInputError(inputForm, configForm) {
  const errorInputForm = searchErrorLabel(inputForm);

  errorInputForm.textContent = inputForm.validationMessage;
  errorInputForm.classList.add(configForm.errorClass);

  inputForm.classList.add(configForm.inputErrorClass);
}

function hideInputError(inputForm, configForm) {
  searchErrorLabel(inputForm).textContent = '';

  inputForm.classList.remove(configForm.inputErrorClass);
}

function searchErrorLabel(inputForm) {
  const inputName = inputForm.getAttribute('name');
  const errorInputForm = document.getElementById(`${inputName}-error`);

  return errorInputForm;
}

enableValidation(formItemsSelectors);
