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
const popupImage = document.querySelector('.popup__purpose_open-image');

// Open buttons
const popupEditProfileOpenButton = document.querySelector('.profile__edit-button');
const popupAddPlaceOpenButton = document.querySelector('.profile__add-button');

// Close buttons
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button_place_edit-profile');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button_place_add-card');
const popupImageCloseButton = popupImage.querySelector('.popup__close-button_place_open-image');

// Profile texts
const titleElement = document.querySelector('.profile__title');
const subtitleElement = document.querySelector('.profile__subtitle');

// Edit Profile Form 
const formEditProfile = document.querySelector('.form_purpose_edit-profile');
const nameInput = formEditProfile.querySelector('.form__input_type_name');
const jobInput = formEditProfile.querySelector('.form__input_type_job');

// Add Card Form
const formAddCard = document.querySelector('.form_purpose_add-card');
const placeInput = formAddCard.querySelector('.form__input_type_place');
const linkInput = formAddCard.querySelector('.form__input_type_link');

const cardsElement = document.querySelector('.elements');
const cardTemplate = document.querySelector('#template-element').content;
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

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

const formEditProfileSubmitHandler = function(evt) {
  evt.preventDefault(); 
  titleElement.textContent = nameInput.value;
  subtitleElement.textContent = jobInput.value;
  closePopup(popupEditProfile);
 }

const formAddCardSubmitHandler = function(evt) {
  evt.preventDefault(); 
  renderCard(linkInput.value, placeInput.value);
  closePopup(popupAddCard);
}

function createCard(link, name) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true)
  cardElement.querySelector('.element__image').src = link;
  cardElement.querySelector('.element__image').alt = name;
  cardElement.querySelector('.element__title').textContent = name;

  const likeButton = cardElement.querySelector('.element__like');
  const deleteButton = cardElement.querySelector('.element__delete');
  const openButton = cardElement.querySelector('.element__image');

  likeButton.addEventListener('click', toogleLike);
  deleteButton.addEventListener('click', deleteCard);
  openButton.addEventListener('click', openCard);
  
  return cardElement;
}

function renderCard(link, name) {
  const cardElement = createCard(link, name);
  cardsElement.prepend(cardElement);
}

function openCard(evt) {
  popupImage.classList.add('popup_opened');
  popupImagePicture.src = evt.target.src;
  popupImageCaption.textContent = evt.target.alt;
}

function toogleLike (evt) {
  evt.target.classList.toggle('element__like_active');
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

initialCards.forEach(function(initialCards) {
  renderCard(initialCards.link, initialCards.name)
})

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
popupImageCloseButton.addEventListener('click', function () {
  closePopup(popupImage)
});

// listeners submit
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formAddCard.addEventListener('submit', formAddCardSubmitHandler);