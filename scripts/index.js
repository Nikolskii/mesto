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
  popupImageCaption,
  popupImageLink,
  cardSelectors,
  formSelectors,
} from './constants.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

function handleCardClick(name, link) {
  popupImageCaption.textContent = name;
  popupImageLink.src = link;
  popupImageLink.alt = name;

  openPopup(popupImage);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  document.removeEventListener('keydown', closePopupByEsc);
}

function closePopupByClickOnOverlay(event, popup) {
  if (event.target === event.currentTarget) {
    closePopup(popup);
  }
}

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');

    closePopup(openedPopup);
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

  cardsContainer.prepend(createCard(configCard));

  closePopup(popupAddCard);
}

function createCard(item) {
  const card = new Card(item, cardSelectors, handleCardClick).generateCard();
  return card;
}

function renderCards() {
  initialCards.forEach((item) => {
    cardsContainer.prepend(createCard(item));
  });
}

const formEditProfileValidation = new FormValidator(
  formSelectors,
  formSelectors.formEditProfile
);

const formAddCardValidation = new FormValidator(
  formSelectors,
  formSelectors.formAddCard
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
