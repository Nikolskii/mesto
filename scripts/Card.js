const popupImage = document.querySelector('.popup_purpose_open-image');
const popupImagePicture = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

const selectors = {
  cardImage: '.element__image',
  cardTitle: '.element__title',
  card: '.element',
  popupOpened: 'popup_opened',
  buttonLike: '.element__like',
  likeActive: 'element__like_active',
  buttonDelete: '.element__delete',
};

export class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._template)
      .content.querySelector(selectors.card)
      .cloneNode(true);

    return card;
  }

  generateCard() {
    this._card = this._getTemplate();

    const imageCard = this._card.querySelector(selectors.cardImage);

    imageCard.src = this._link;
    imageCard.alt = this._name;

    this._card.querySelector(selectors.cardTitle).textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._card
      .querySelector(selectors.cardImage)
      .addEventListener('click', () => {
        this._openCard();
      });

    this._card
      .querySelector(selectors.buttonLike)
      .addEventListener('click', () => {
        this._toggleLike();
      });

    this._card
      .querySelector(selectors.buttonDelete)
      .addEventListener('click', () => {
        this._deleteCard();
      });
  }

  _openCard() {
    popupImagePicture.src = this._link;
    popupImageCaption.textContent = this._name;
    popupImage.classList.add(selectors.popupOpened);
  }

  _toggleLike() {
    this._card
      .querySelector(selectors.buttonLike)
      .classList.toggle(selectors.likeActive);
  }

  _deleteCard() {
    this._card.closest(selectors.card).remove();
  }
}
