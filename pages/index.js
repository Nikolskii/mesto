import {
  initialCards,
  popupEditProfile,
  popupAddCard,
  popupImage,
  popupEditProfileOpenButton,
  popupAddCardOpenButton,
  nameInput,
  jobInput,
  cardsContainer,
  formValidators,
  cardSelectors,
  formSelectors,
  userData,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupOpenImage = new PopupWithImage(popupImage);

const userInfo = new UserInfo(userData);

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

const popupAddCardForm = new PopupWithForm({
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

const popupEditProfileForm = new PopupWithForm({
  popup: popupEditProfile,
  handleSubmitForm: (formData) => {
    const configProfile = {
      name: formData.form__input_type_name,
      description: formData.form__input_type_job,
    };

    userInfo.setUserInfo(configProfile);
  },
});

popupOpenImage.setEventListeners();
popupAddCardForm.setEventListeners();
popupEditProfileForm.setEventListeners();

function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    const validator = new FormValidator(config, form);
    const formName = form.getAttribute('name');

    formValidators[formName] = validator;

    validator.enableValidation();
  });
}

popupEditProfileOpenButton.addEventListener('click', () => {
  formValidators['form-profile'].resetValidation();

  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  jobInput.value = userData.description;

  popupEditProfileForm.open();
});

popupAddCardOpenButton.addEventListener('click', () => {
  formValidators['form-place'].resetValidation();

  popupAddCardForm.open();
});

enableValidation(formSelectors);

cardList.renderItem();
