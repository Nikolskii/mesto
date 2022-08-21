import {
  initialCards,
  popups,
  popupEditProfile,
  popupAddCard,
  popupImage,
  popupEditProfileOpenButton,
  popupAddCardOpenButton,
  titleProfile,
  subtitleProfile,
  formEditProfile,
  nameInput,
  jobInput,
  formAddCard,
  placeInput,
  linkInput,
  cardsContainer,
  formValidators,
  popupImageCaption,
  popupImageLink,
  cardSelectors,
  formSelectors,
} from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import Popup from './Popup.js';

const testPopup = new Popup(popupEditProfile);
testPopup.open();

const cardList = new Section(
  {
    data: initialCards,
    renderer: (initialCards) => {
      const card = new Card(initialCards, cardSelectors, handleCardClick);

      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    },
  },
  cardsContainer
);

function handleCardClick(name, link) {
  popupImageCaption.textContent = name;
  popupImageLink.src = link;
  popupImageLink.alt = name;

  openPopup(popupImage);
}

// function openPopup(popup) {
//   popup.classList.add('popup_opened');

//   document.addEventListener('keydown', closePopupByEsc);
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');

//   document.removeEventListener('keydown', closePopupByEsc);
// }

// function closePopupByEsc(event) {
//   if (event.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');

//     closePopup(openedPopup);
//   }
// }

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

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute('name');

    formValidators[formName] = validator;

    validator.enableValidation();
  });
}

// listeners open popup
popupEditProfileOpenButton.addEventListener('click', () => {
  formValidators['form-profile'].resetValidation();

  nameInput.value = titleProfile.textContent;
  jobInput.value = subtitleProfile.textContent;

  openPopup(popupEditProfile);
});

popupAddCardOpenButton.addEventListener('click', () => {
  formAddCard.reset();

  formValidators['form-place'].resetValidation();

  openPopup(popupAddCard);
});

// listener close popups
// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//     if (
//       evt.target.classList.contains('popup_opened') ||
//       evt.target.classList.contains('popup__close-button')
//     ) {
//       closePopup(popup);
//     }
//   });
// });

// listeners submit
formEditProfile.addEventListener('submit', handleSubmitFormEditProfile);
formAddCard.addEventListener('submit', handleSubmitFormAddCard);

enableValidation(formSelectors);

cardList.renderItem();
