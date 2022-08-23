import {
  initialCards,
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
  cardSelectors,
  formSelectors,
  userData,
} from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import popupWithForm from './PopupWithForm.js';
import Popup from './Popup.js';
import UserInfo from './UserInfo.js';

const popupOpenImage = new PopupWithImage(popupImage);
const popupEditProfileForm = new Popup(popupEditProfile);
// const userInfo = new UserInfo();

function handleSubmitFormEditProfile() {
  titleProfile.textContent = nameInput.value;
  subtitleProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

const cardList = new Section(
  {
    data: initialCards,
    renderer: (initialCards) => {
      const card = new Card({
        data: initialCards,
        cardSelectors,
        handleCardClick: () => {
          popupOpenImage.open(initialCards.name, initialCards.link);
        },
      });

      cardList.addItem(card.generateCard());
    },
  },
  cardsContainer
);

const popupAddCardForm = new popupWithForm({
  popup: popupAddCard,
  handleSubmitForm: (formData) => {
    const configCard = {
      name: formData.form__input_type_place,
      link: formData.form__input_type_link,
    };

    const card = new Card({
      data: configCard,
      cardSelectors,
      handleCardClick: () => {
        popupOpenImage.open(configCard.name, configCard.link);
      },
    });

    cardList.addItem(card.generateCard());
  },
});

function handleSubmitFormEditProfile() {
  titleProfile.textContent = nameInput.value;
  subtitleProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
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

  popupEditProfileForm.open();
});

popupAddCardOpenButton.addEventListener('click', () => {
  formAddCard.reset();

  formValidators['form-place'].resetValidation();

  popupAddCardForm.open();
});

// listeners submit
formEditProfile.addEventListener('submit', handleSubmitFormEditProfile);

enableValidation(formSelectors);

cardList.renderItem();
