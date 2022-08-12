const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// Popups
const popupEditProfile = document.querySelector('.popup_purpose_edit-profile');
const popupAddCard = document.querySelector('.popup_purpose_add-card');
const popupImage = document.querySelector('.popup_purpose_open-image');

const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageLink = popupImage.querySelector('.popup__image');

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

const cardSelectors = {
  template: '.template-element',
  cardBlank: '.element',
  cardImage: '.element__image',
  cardTitle: '.element__title',
  buttonLike: '.element__like',
  buttonDelete: '.element__delete',
  likeActive: 'element__like_active',
};

const formSelectors = {
  formEditProfile: '.form_purpose_edit-profile',
  formAddCard: '.form_purpose_add-card',
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

export {
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
};
