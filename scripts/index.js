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
const popupEditProfileElement = document.querySelector('.popup_purpose_edit-profile');
const popupAddPlaceElement = document.querySelector('.popup_purpose_add-place');

const popupEditProfileOpenButtonElement = document.querySelector('.profile__edit-button');
const popupAddPlaceOpenButtonElement = document.querySelector('.profile__add-button');

const popupEditProfileCloseButtonElement = popupEditProfileElement.querySelector('.popup__close-button_place_edit-profile');
const popupAddPlaceCloseButtonElement = popupAddPlaceElement.querySelector('.popup__close-button_place_add-place');

const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');

const formEditProfileElement = document.querySelector('.form_purpose_edit-profile');
const nameInput = formEditProfileElement.querySelector('.form__input_type_name');
const jobInput = formEditProfileElement.querySelector('.form__input_type_job');

const postsElement = document.querySelector('.elements');
const postTemplate = document.querySelector('#template-element').content;

const openPopup = function(element) {
    element.classList.add('popup_opened');
    if (element === popupElement) {
      nameInput.value = titleElement.textContent; 
      jobInput.value = subtitleElement.textContent;
    }
  }

const closePopup = function(element) {
  element.classList.remove('popup_opened');
}

//  const closePopupByClickOnOverlay = function(event) {
//   if (event.target !== event.currentTarget) {
//     return;
//   }
//   closePopup();
//  }

 function formSubmitHandler (evt) {
  evt.preventDefault(); 
  titleElement.textContent = nameInput.value;
  subtitleElement.textContent = jobInput.value;
  closePopup(popupEditProfileElement);
 }

const fillingElements = function() {
  for (i = 0; i < initialCards.length; i++) {

    const articleElement = postTemplate.querySelector('.element').cloneNode(true);

    articleElement.querySelector('.element__image').src = initialCards[i].link;
    articleElement.querySelector('.element__image').alt = initialCards[i].name;
    articleElement.querySelector('.element__title').textContent = initialCards[i].name;

    postsElement.append(articleElement);
  }
}

fillingElements();

popupEditProfileOpenButtonElement.addEventListener('click', () => openPopup(popupEditProfileElement));
popupAddPlaceOpenButtonElement.addEventListener('click', () => openPopup(popupAddPlaceElement));
popupEditProfileCloseButtonElement.addEventListener('click', () => closePopup(popupEditProfileElement));
popupAddPlaceCloseButtonElement.addEventListener('click',  () => closePopup(popupAddPlaceElement));
formEditProfileElement.addEventListener('submit', formSubmitHandler);
// popupElement.addEventListener('click', closePopupByClickOnOverlay);
