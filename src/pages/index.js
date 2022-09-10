// import '../pages/index.css';

import {
  popupEditProfile,
  popupAddCard,
  popupImage,
  popupUpdateAvatar,
  popupEditProfileOpenButton,
  popupAddCardOpenButton,
  popupUpdateAvatarOpenButton,
  popupSubmit,
  nameInput,
  jobInput,
  cardsContainer,
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
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';

const popupOpenImage = new PopupWithImage(popupImage);

const userInfo = new UserInfo(userData);

const popupWithSubmit = new PopupWithSubmit({
  popup: popupSubmit,
});

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
  headers: {
    authorization: 'b1e377f1-cd98-498c-a108-b0af0056347c',
    'Content-Type': 'application/json',
  },
});

// Получение информации о пользователе
api
  .downloadUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res);
    userInfo.getUserId(res._id);
  })
  .catch((err) => {
    console.log(err);
  });

// Получение карточек с сервера
api
  .getInitialCards()
  .then((res) => {
    const cardList = new Section(
      {
        data: res,
        renderer: (initialCards) => {
          createCard(initialCards);
        },
      },
      cardsContainer
    );

    cardList.renderItems(res.reverse());
  })
  .then((err) => {
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
          .then(() => card.deleteCard())
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

const cardList = new Section(
  {
    data: [],
    renderer: (initialCards) => {
      createCard(initialCards);
    },
  },
  cardsContainer
);

// Форма добавления карточки
const popupAddCardForm = new PopupWithForm({
  popup: popupAddCard,
  handleSubmitForm: (formData) => {
    popupAddCardForm.renderLoading(true);

    const configCard = {
      name: formData.form__input_type_place,
      link: formData.form__input_type_link,
    };

    api
      .addCard(configCard.name, configCard.link)
      .then((res) => createCard(res))
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
  popup: popupEditProfile,
  handleSubmitForm: (formData) => {
    popupEditProfileForm.renderLoading(true);

    const configProfile = {
      name: formData.form__input_type_name,
      about: formData.form__input_type_job,
    };

    api
      .updateUserInfo(configProfile.name, configProfile.about)
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          about: res.about,
        });
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
  popup: popupUpdateAvatar,
  handleSubmitForm: (formData) => {
    popupUpdateAvatarForm.renderLoading(true);

    api
      .updateUserAvatar(Object.values(formData)[0])
      .then((res) => {
        userData.userAvatar.src = res.avatar;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupUpdateAvatarForm.renderLoading(false);
      });
  },
});

// Слушатели событий
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
