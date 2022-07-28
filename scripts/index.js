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

function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', (event) => {
    closePopupByKeystrokeEsc(event);
  });
}

function openPopupEditProfile(popup) {
  nameInput.value = titleProfile.textContent;
  jobInput.value = subtitleProfile.textContent;

  openPopup(popup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', (event) => {
    closePopupByKeystrokeEsc(event);
  });
}

function closePopupByClickOnOverlay(event, popup) {
  if (event.target === event.currentTarget) {
    closePopup(popup);
  }
}

function closePopupByKeystrokeEsc(event) {
  popupsArray.forEach((popup) => {
    if (event.key === 'Escape') {
      closePopup(popup);
    }
  });
}

function handleSubmitFormEditProfile() {
  titleProfile.textContent = nameInput.value;
  subtitleProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleSubmitFormAddCard() {
  const submitButtonFormAddCard = formAddCard.querySelector('.form__button');

  addCard(linkInput.value, placeInput.value);

  closePopup(popupAddCard);

  formAddCard.reset();

  submitButtonFormAddCard.disabled = true;
  submitButtonFormAddCard.classList.add('form__button_inactive');
}

function createCard(link, name) {
  const card = cardBlank.cloneNode(true);
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

function openCard(event) {
  popupImagePicture.src = event.target.src;
  popupImageCaption.textContent = event.target.alt;
  openPopup(popupImage);
}

function toggleLike(event) {
  event.target.classList.toggle('element__like_active');
}

function deleteCard(event) {
  event.target.closest('.element').remove();
}

initialCards.forEach((initialCards) => {
  addCard(initialCards.link, initialCards.name);
});

// listeners open popup
popupEditProfileOpenButton.addEventListener('click', () => {
  openPopupEditProfile(popupEditProfile);
});

popupAddCardOpenButton.addEventListener('click', () => {
  openPopup(popupAddCard);
});

// listeners close popup
popupEditProfileCloseButton.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

popupAddCardCloseButton.addEventListener('click', () => {
  closePopup(popupAddCard);
});

popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImage);
});

//listeners close popup by click on overlay
popupEditProfile.addEventListener('click', () => {
  closePopupByClickOnOverlay(event, popupEditProfile);
});

popupAddCard.addEventListener('click', () => {
  closePopupByClickOnOverlay(event, popupAddCard);
});

popupImage.addEventListener('click', () => {
  closePopupByClickOnOverlay(event, popupImage);
});

// listeners submit
formEditProfile.addEventListener('submit', handleSubmitFormEditProfile);
formAddCard.addEventListener('submit', handleSubmitFormAddCard);
