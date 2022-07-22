const formItems = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

function enableValidation(configForm) {
  const formList = Array.from(document.querySelectorAll(configForm.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', handleFormSubmit);

    setEventListeners(formElement, configForm);
  });
};

function handleFormSubmit (event) {
  event.preventDefault();
};

function setEventListeners(formElement, configForm) {
  const inputList = Array.from(formElement.querySelectorAll(configForm.inputSelector));
  const buttonElement = formElement.querySelector(configForm.submitButtonSelector)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      handleFormInput(inputElement, configForm);
      setSubmitButtonState(buttonElement, formElement);
    })
  })
};

function setSubmitButtonState(buttonElement, formElement) {
  const isValid = formElement.checkValidity();

  if (isValid) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(formItems.inactiveButtonClass);
  } else {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(formItems.inactiveButtonClass);
  }
}

function handleFormInput (inputElement, configForm) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, configForm);
  } else {
    hideInputError(inputElement, configForm);
  }
}

function showInputError(inputElement, configForm) {
  searchElement(inputElement).textContent = inputElement.validationMessage;
  searchElement(inputElement).classList.add(configForm.errorClass);

  inputElement.classList.add(configForm.inputErrorClass);
};

function hideInputError(inputElement, configForm) {
  searchElement(inputElement).textContent = '';

  inputElement.classList.remove(configForm.inputErrorClass);
}

function searchElement(inputElement) {
  const inputName = inputElement.getAttribute('name');
  const errorElement = document.getElementById(`${inputName}-error`);

  return errorElement;
}

enableValidation(formItems);