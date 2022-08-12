import {
  initialCards,
  popupEditProfile,
  popupAddCard,
  popupImage,
  popupEditProfileOpenButton,
  popupAddCardOpenButton,
  popupEditProfileCloseButton,
  popupAddCardCloseButton,
  popupImageCloseButton,
  titleProfile,
  subtitleProfile,
  formEditProfile,
  nameInput,
  jobInput,
  formAddCard,
  placeInput,
  linkInput,
  cardsContainer,
  cardSelectors,
  formSelectors,
} from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

function handleCardClick(name, link) {
  popupImage.querySelector('.popup__caption').textContent = name;
  popupImage.querySelector('.popup__image').src = link;

  openPopup(popupImage);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', (event) => {
    closePopupByKeystrokeEsc(event, popup);
  });
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

function closePopupByKeystrokeEsc(event, popup) {
  if (event.key === 'Escape') {
    closePopup(popup);
  }
}

function handleSubmitFormEditProfile() {
  titleProfile.textContent = nameInput.value;
  subtitleProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

function handleSubmitFormAddCard() {
  const configCard = {
    name: placeInput.value,
    link: linkInput.value,
  };

  const card = new Card(
    configCard,
    cardSelectors,
    handleCardClick
  ).generateCard();
  cardsContainer.prepend(card);

  closePopup(popupAddCard);
}

function renderCards() {
  initialCards.forEach((item) => {
    const card = new Card(item, cardSelectors, handleCardClick).generateCard();
    cardsContainer.prepend(card);
  });
}

const formEditProfileValidation = new FormValidator(
  formSelectors,
  '.form_purpose_edit-profile'
);

const formAddCardValidation = new FormValidator(
  formSelectors,
  '.form_purpose_add-card'
);

// listeners open popup
popupEditProfileOpenButton.addEventListener('click', () => {
  formEditProfileValidation.resetValidation();

  nameInput.value = titleProfile.textContent;
  jobInput.value = subtitleProfile.textContent;

  openPopup(popupEditProfile);
});

popupAddCardOpenButton.addEventListener('click', () => {
  formAddCard.reset();

  formAddCardValidation.resetValidation();

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

renderCards();
formEditProfileValidation.enableValidation();
formAddCardValidation.enableValidation();
