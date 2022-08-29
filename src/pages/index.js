// import '../pages/index.css';

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

function createCard(dataCard) {
  const card = new Card({
    data: dataCard,
    cardSelectors,
    handleCardClick: () => {
      popupOpenImage.open(dataCard.name, dataCard.link);
    },
  });
  cardList.addItem(card.generateCard());
}

const cardList = new Section(
  {
    data: initialCards,
    renderer: (initialCards) => {
      createCard(initialCards);
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

    createCard(configCard);
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

const formEditProfileValidation = new FormValidator(
  formSelectors,
  formSelectors.formEditProfile
);

const formAddCardValidation = new FormValidator(
  formSelectors,
  formSelectors.formAddCard
);

popupEditProfileOpenButton.addEventListener('click', () => {
  formEditProfileValidation.resetValidation();

  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  jobInput.value = userData.description;

  popupEditProfileForm.open();
});

popupAddCardOpenButton.addEventListener('click', () => {
  formAddCardValidation.resetValidation();

  popupAddCardForm.open();
});

cardList.renderItems();

formEditProfileValidation.enableValidation();
formAddCardValidation.enableValidation();
