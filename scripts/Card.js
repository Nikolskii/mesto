export class Card {
  constructor(data, template, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;

    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._template)
      .content.querySelector('.element')
      .cloneNode(true);

    return card;
  }

  generateCard() {
    this._card = this._getTemplate();

    const imageCard = this._card.querySelector('.element__image');

    imageCard.src = this._link;
    imageCard.alt = this._name;

    this._card.querySelector('.element__title').textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._card
      .querySelector('.element__image')
      .addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });

    this._card.querySelector('.element__like').addEventListener('click', () => {
      this._toggleLike();
    });

    this._card
      .querySelector('.element__delete')
      .addEventListener('click', () => {
        this._deleteCard();
      });
  }

  _toggleLike() {
    this._card
      .querySelector('.element__like')
      .classList.toggle('element__like_active');
  }

  _deleteCard() {
    this._card.closest('.element').remove();
  }
}
