const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_type_name');
const jobInput = formElement.querySelector('.form__input_type_job');

const elementsElement = document.querySelector('.elements');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
  nameInput.value = titleElement.textContent;
  jobInput.value = subtitleElement.textContent;
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

 const closePopupByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup();
 }

 function formSubmitHandler (evt) {
  evt.preventDefault(); 
  titleElement.textContent = nameInput.value;
  subtitleElement.textContent = jobInput.value;
  closePopup();
 }

const fillingElements = function() {
  for (i = 0; i < initialCards.length; i++) {
    const elementTemplate = document.querySelector('#template-element').content;
    const articleElement = elementTemplate.querySelector('.element').cloneNode(true);

    articleElement.querySelector('.element__image').src = initialCards[i].link;
    articleElement.querySelector('.element__image').alt = initialCards[i].name;
    articleElement.querySelector('.element__title').textContent = initialCards[i].name;

    elementsElement.append(articleElement);
  }
}

fillingElements();

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
popupElement.addEventListener('click', closePopupByClickOnOverlay);