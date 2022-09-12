import '../pages/index.css';

import {
  popupEditProfileOpenButton,
  popupAddCardOpenButton,
  popupUpdateAvatarOpenButton,
  nameInput,
  jobInput,
  cardsContainerSelector,
  cardSelectors,
  formSelectors,
  popupsSelectors,
  userDataSelectors,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';

// Форма добавления карточки
const popupAddCardForm = new PopupWithForm({
  popup: popupsSelectors.popupAddCard,
  handleSubmitForm: (formData) => {
    popupAddCardForm.renderLoading(true);

    const configCard = {
      name: formData.form__input_type_place,
      link: formData.form__input_type_link,
    };

    api
      .addCard(configCard.name, configCard.link)
      .then((res) => {
        createCard(res);

        popupAddCardForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAddCardForm.renderLoading(false);
      });
  },
});

// Форма редактирования профиля
const popupEditProfileForm = new PopupWithForm({
  popup: popupsSelectors.popupEditProfile,
  handleSubmitForm: (formData) => {
    popupEditProfileForm.renderLoading(true);

    const configProfile = {
      name: formData.form__input_type_name,
      about: formData.form__input_type_job,
    };

    api
      .updateUserInfo(configProfile.name, configProfile.about)
      .then((res) => {
        userInfo.setUserInfo(res);

        popupEditProfileForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEditProfileForm.renderLoading(false);
      });
  },
});

// Форма обноваления аватара
const popupUpdateAvatarForm = new PopupWithForm({
  popup: popupsSelectors.popupUpdateAvatar,
  handleSubmitForm: (formData) => {
    popupUpdateAvatarForm.renderLoading(true);

    api
      .updateUserAvatar(formData.form__input_type_avatar)
      .then((res) => {
        userInfo.setUserAvatar(res);

        popupUpdateAvatarForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupUpdateAvatarForm.renderLoading(false);
      });
  },
});

// Попап подтверждения
const popupWithSubmit = new PopupWithSubmit({
  popup: popupsSelectors.popupSubmit,
});

// Секция карточек
const cardList = new Section(
  {
    renderer: (card) => {
      createCard(card);
    },
  },
  cardsContainerSelector
);

const popupOpenImage = new PopupWithImage({
  popup: popupsSelectors.popupImage,
});

const userInfo = new UserInfo(userDataSelectors);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: 'b1e377f1-cd98-498c-a108-b0af0056347c',
    'Content-Type': 'application/json',
  },
});

//Получение и отображение карточек и информации о пользователе
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, InitialCards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userInfo.setUserId(userData._id);

    cardList.renderItems(InitialCards.reverse());
  })
  .catch((err) => {
    console.log(err);
  });

// Создание карточки
function createCard(dataCard) {
  const card = new Card({
    data: dataCard,
    userId: userInfo.getUserId(),
    cardSelectors,
    handleCardClick: () => {
      popupOpenImage.open(dataCard.name, dataCard.link);
    },
    handleCardDelete: () => {
      popupWithSubmit.open();

      popupWithSubmit.handleSubmitRedefinition(() => {
        api
          .deleteCard(card.cardId)
          .then(() => {
            card.deleteCard();

            popupWithSubmit.close();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
    handleCardLike: () => {
      if (!card.checkLikeSetted()) {
        api
          .addLikeCard(card.cardId)
          .then((res) => {
            card.addLike();
            card.countLikes(res.likes);
            card.updateLikes(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        api
          .deleteLikeCard(card.cardId)
          .then((res) => {
            card.deleteLike();
            card.countLikes(res.likes);
            card.updateLikes(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  });
  cardList.addItem(card.generateCard());
}

// Обработчики событий
popupEditProfileOpenButton.addEventListener('click', () => {
  formEditProfileValidation.resetValidation();

  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  jobInput.value = userData.about;

  popupEditProfileForm.open();
});

popupAddCardOpenButton.addEventListener('click', () => {
  formAddCardValidation.resetValidation();

  popupAddCardForm.open();
});

popupUpdateAvatarOpenButton.addEventListener('click', () => {
  formUpdateAvatarValidation.resetValidation();

  popupUpdateAvatarForm.open();
});

popupOpenImage.setEventListeners();
popupAddCardForm.setEventListeners();
popupEditProfileForm.setEventListeners();
popupUpdateAvatarForm.setEventListeners();
popupWithSubmit.setEventListeners();

// Валидация форм
const formEditProfileValidation = new FormValidator(
  formSelectors,
  formSelectors.formEditProfile
);

const formAddCardValidation = new FormValidator(
  formSelectors,
  formSelectors.formAddCard
);

const formUpdateAvatarValidation = new FormValidator(
  formSelectors,
  formSelectors.formUpdateAvatar
);

formEditProfileValidation.enableValidation();
formAddCardValidation.enableValidation();
formUpdateAvatarValidation.enableValidation();
