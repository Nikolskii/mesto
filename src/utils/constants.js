// Card
const cardSelectors = {
  template: '.template-element',
  cardBlank: '.element',
  cardImage: '.element__image',
  cardTitle: '.element__title',
  buttonLike: '.element__like',
  buttonDelete: '.element__delete',
  likeActive: 'element__like_active',
  likeCounter: '.element__like-counter',
};

// Form
const formSelectors = {
  formEditProfile: '.form_purpose_edit-profile',
  formAddCard: '.form_purpose_add-card',
  formUpdateAvatar: '.form_purpose_update-avatar',
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active',
};

// Popups
const popupsSelectors = {
  popupEditProfile: '.popup_purpose_edit-profile',
  popupAddCard: '.popup_purpose_add-card',
  popupImage: '.popup_purpose_open-image',
  popupUpdateAvatar: '.popup_purpose_update-avatar',
  popupSubmit: '.popup_purpose_submit',
};

// Open buttons
const popupEditProfileOpenButton = document.querySelector(
  '.profile__edit-button'
);
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const popupUpdateAvatarOpenButton = document.querySelector(
  '.profile__update-button'
);

// User info
const userData = {
  userName: document.querySelector('.profile__title'),
  userAbout: document.querySelector('.profile__subtitle'),
  userAvatar: document.querySelector('.profile__avatar'),
};

// Edit Profile Form
const formEditProfile = document.querySelector(formSelectors.formEditProfile);
const nameInput = formEditProfile.querySelector('.form__input_type_name');
const jobInput = formEditProfile.querySelector('.form__input_type_job');

const cardsContainerSelector = '.elements';

export {
  popupEditProfileOpenButton,
  popupAddCardOpenButton,
  popupUpdateAvatarOpenButton,
  nameInput,
  jobInput,
  cardsContainerSelector,
  cardSelectors,
  formSelectors,
  popupsSelectors,
  userData,
};
