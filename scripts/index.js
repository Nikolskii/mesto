// Popups
const popupEditProfile = document.querySelector('.popup_purpose_edit-profile');
const popupAddCard = document.querySelector('.popup_purpose_add-card');
const popupImage = document.querySelector('.popup_purpose_open-image');

const popupsArray = [popupEditProfile, popupAddCard, popupImage];

// Open buttons
const popupEditProfileOpenButton = document.querySelector(
  '.profile__edit-button'
);
const popupAddCardOpenButton = document.querySelector('.profile__add-button');

// Close buttons
const popupEditProfileCloseButton = popupEditProfile.querySelector(
  '.popup__close-button_place_edit-profile'
);
const popupAddCardCloseButton = popupAddCard.querySelector(
  '.popup__close-button_place_add-card'
);
const popupImageCloseButton = popupImage.querySelector(
  '.popup__close-button_place_open-image'
);

// Profile texts
const titleProfile = document.querySelector('.profile__title');
const subtitleProfile = document.querySelector('.profile__subtitle');

// Edit Profile Form
const formEditProfile = document.querySelector('.form_purpose_edit-profile');
const nameInput = formEditProfile.querySelector('.form__input_type_name');
const jobInput = formEditProfile.querySelector('.form__input_type_job');

// Add Card Form
const formAddCard = document.querySelector('.form_purpose_add-card');
const placeInput = formAddCard.querySelector('.form__input_type_place');
const linkInput = formAddCard.querySelector('.form__input_type_link');

const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#template-element').content;
const cardBlank = cardTemplate.querySelector('.element');

const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

const openPopup = function (popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', function (evt) {
    closePopupByKeystrokeEsc(evt);
  });
};

function openPopupEditProfile(popup) {
  nameInput.value = titleProfile.textContent;
  jobInput.value = subtitleProfile.textContent;

  openPopup(popup);
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', function (evt) {
    closePopupByKeystrokeEsc(evt);
  });
};

const closePopupByClickOnOverlay = function (event, popup) {
  if (event.target === event.currentTarget) {
    closePopup(popup);
  }
};

const closePopupByKeystrokeEsc = function (evt) {
  popupsArray.forEach(function (popup) {
    if (evt.key === 'Escape') {
      closePopup(popup);
    }
  });
};

const handleSubmitFormEditProfile = function (evt) {
  titleProfile.textContent = nameInput.value;
  subtitleProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

const handleSubmitFormAddCard = function (evt) {
  addCard(linkInput.value, placeInput.value);
  closePopup(popupAddCard);
  linkInput.value = '';
  placeInput.value = '';
};

function createCard(link, name) {
  card = cardBlank.cloneNode(true);
  const imageCard = card.querySelector('.element__image');

  imageCard.src = link;
  imageCard.alt = name;
  card.querySelector('.element__title').textContent = name;

  const buttonLike = card.querySelector('.element__like');
  const buttonDelete = card.querySelector('.element__delete');

  buttonLike.addEventListener('click', toggleLike);
  buttonDelete.addEventListener('click', deleteCard);
  imageCard.addEventListener('click', openCard);

  return card;
}

function addCard(link, name) {
  const card = createCard(link, name);
  cardsContainer.prepend(card);
}

function openCard(evt) {
  popupImagePicture.src = evt.target.src;
  popupImageCaption.textContent = evt.target.alt;
  openPopup(popupImage);
}

function toggleLike(evt) {
  evt.target.classList.toggle('element__like_active');
}

function deleteCard(evt) {
  evt.target.closest('.element').remove();
}

initialCards.forEach(function (initialCards) {
  addCard(initialCards.link, initialCards.name);
});

// listeners open popup
popupEditProfileOpenButton.addEventListener('click', function () {
  openPopupEditProfile(popupEditProfile);
});

popupAddCardOpenButton.addEventListener('click', function () {
  openPopup(popupAddCard);
});

// listeners close popup
popupEditProfileCloseButton.addEventListener('click', function () {
  closePopup(popupEditProfile);
});

popupAddCardCloseButton.addEventListener('click', function () {
  closePopup(popupAddCard);
});

popupImageCloseButton.addEventListener('click', function () {
  closePopup(popupImage);
});

//listeners close popup by click on overlay
popupEditProfile.addEventListener('click', function () {
  closePopupByClickOnOverlay(event, popupEditProfile);
});

popupAddCard.addEventListener('click', function () {
  closePopupByClickOnOverlay(event, popupAddCard);
});

popupImage.addEventListener('click', function () {
  closePopupByClickOnOverlay(event, popupImage);
});

// listeners submit
formEditProfile.addEventListener('submit', handleSubmitFormEditProfile);
formAddCard.addEventListener('submit', handleSubmitFormAddCard);
