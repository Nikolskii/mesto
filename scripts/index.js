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

// Popups
const popupEditProfile = document.querySelector('.popup_purpose_edit-profile');
const popupAddCard = document.querySelector('.popup_purpose_add-card');

// Open buttons
const popupEditProfileOpenButton = document.querySelector('.profile__edit-button');
const popupAddPlaceOpenButton = document.querySelector('.profile__add-button');

// Close buttons
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button_place_edit-profile');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button_place_add-card');

const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');

const formEditProfileElement = document.querySelector('.form_purpose_edit-profile');
const nameInput = formEditProfileElement.querySelector('.form__input_type_name');
const jobInput = formEditProfileElement.querySelector('.form__input_type_job');

const cardsElement = document.querySelector('.elements');
const cardTemplate = document.querySelector('#template-element').content; // delete

const openPopup = function(element) {
    element.classList.add('popup_opened');
    if (element === popupEditProfile) {
      nameInput.value = titleElement.textContent; 
      jobInput.value = subtitleElement.textContent;
    }
  }

const closePopup = function(element) {
  element.classList.remove('popup_opened');
}

 const formSubmitHandler = function(evt) {
  evt.preventDefault(); 
  titleElement.textContent = nameInput.value;
  subtitleElement.textContent = jobInput.value;
  closePopup(popupEditProfile);
 }




 function createCard(element) {
  const cardElement = document.querySelector('#template-element').content.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = element.link;
  cardElement.querySelector('.element__image').alt = element.name;
  cardElement.querySelector('.element__title').textContent = element.name;
  cardsElement.append(cardElement);
 }

// function renderCard(element, cardsElement) {
//   const cardElement = createCard(element);
//   cardsElement.append(cardElement);
// };



 function createInitialCards() {
  initialCards.forEach(createCard);
 }

 createInitialCards();




// listeners open popup
popupEditProfileOpenButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
});
popupAddPlaceOpenButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

// listeners close popup
popupEditProfileCloseButton.addEventListener('click', function () {
  closePopup(popupEditProfile)
});
popupAddCardCloseButton.addEventListener('click', function () {
  closePopup(popupAddCard)
});

// listeners submit
formEditProfileElement.addEventListener('submit', formSubmitHandler);


