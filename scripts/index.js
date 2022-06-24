const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
}
const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__name');
const jobInput = formElement.querySelector('.form__job');

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  const titleElement = document.querySelector('.profile__title');
  const subtitleElement = document.querySelector('.profile__subtitle');
  titleElement.textContent = nameInput.value;
  subtitleElement.textContent = jobInput.value;
  closePopup();
 }

formElement.addEventListener('submit', formSubmitHandler);