const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_type_name');
const jobInput = formElement.querySelector('.form__input_type_job');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
  nameInput.value = titleElement.textContent;
  jobInput.value = subtitleElement.textContent;
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  titleElement.textContent = nameInput.value;
  subtitleElement.textContent = jobInput.value;
  closePopup();
 }

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);