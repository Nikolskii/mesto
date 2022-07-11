// Popups
const popupEditProfile = document.querySelector('.popup_purpose_edit-profile');
const popupAddCard = document.querySelector('.popup_purpose_add-card');
const popupImage = document.querySelector('.popup_purpose_open-image');

// Open buttons
const popupEditProfileOpenButton = document.querySelector('.profile__edit-button');
const popupAddCardOpenButton = document.querySelector('.profile__add-button');

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
  addCard(linkInput.value, placeInput.value);
  closePopup(popupAddCard);
}

function createCard(link, name) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true)
  const imageElement = cardElement.querySelector('.element__image');
  
  imageElement.src = link;
  imageElement.alt = name;
  cardElement.querySelector('.element__title').textContent = name;

  const buttonLike = cardElement.querySelector('.element__like');
  const buttonDelete = cardElement.querySelector('.element__delete');

  buttonLike.addEventListener('click', toogleLike);
  buttonDelete.addEventListener('click', deleteCard);
  imageElement.addEventListener('click', openCard);
  
  return cardElement;
}

function addCard(link, name) {
  const cardElement = createCard(link, name);
  cardsElement.prepend(cardElement);
}

function openCard(evt) {
  openPopup(popupImage);
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
  addCard(initialCards.link, initialCards.name)
})

// listeners open popup
popupEditProfileOpenButton.addEventListener('click', function () {
  openPopup(popupEditProfile);
  nameInput.value = titleElement.textContent; 
  jobInput.value = subtitleElement.textContent;
});

popupAddCardOpenButton.addEventListener('click', function () {
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