export class Card {
  constructor(data, cardSelectors, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._selectors = cardSelectors;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._selectors.template)
      .content.querySelector(this._selectors.cardBlank)
      .cloneNode(true);

    return card;
  }

  generateCard() {
    this._card = this._getTemplate();

    this._card.querySelector(this._selectors.cardImage).src = this._link;
    this._card.querySelector(this._selectors.cardImage).alt = this._name;

    this._card.querySelector(this._selectors.cardTitle).textContent =
      this._name;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._card
      .querySelector(this._selectors.cardImage)
      .addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });

    this._card
      .querySelector(this._selectors.buttonLike)
      .addEventListener('click', () => {
        this._toggleLike();
      });

    this._card
      .querySelector(this._selectors.buttonDelete)
      .addEventListener('click', () => {
        this._deleteCard();
      });
  }

  _toggleLike() {
    this._card
      .querySelector(this._selectors.buttonLike)
      .classList.toggle(this._selectors.likeActive);
  }

  _deleteCard() {
    this._card.closest(this._selectors.cardBlank).remove();
  }
}
