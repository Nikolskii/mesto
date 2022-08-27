export default class Card {
  constructor({ data, cardSelectors, handleCardClick }) {
    this._name = data.name;
    this._link = data.link;
    this._selectors = cardSelectors;
    this._handleCardClick = handleCardClick;
    this._card = document
      .querySelector(this._selectors.template)
      .content.querySelector(this._selectors.cardBlank)
      .cloneNode(true);
    this._cardImage = this._card.querySelector(this._selectors.cardImage);
    this._cardTitle = this._card.querySelector(this._selectors.cardTitle);
    this._buttonLike = this._card.querySelector(this._selectors.buttonLike);
    this._buttonDelete = this._card.querySelector(this._selectors.buttonDelete);
  }

  generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._buttonLike.addEventListener('click', () => {
      this._toggleLike();
    });

    this._buttonDelete.addEventListener('click', () => {
      this._deleteCard();
    });
  }

  _toggleLike() {
    this._buttonLike.classList.toggle(this._selectors.likeActive);
  }

  _deleteCard() {
    this._card.remove();
  }
}
