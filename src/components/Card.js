export default class Card {
  constructor({
    data,
    userId,
    cardSelectors,
    handleCardClick,
    handleCardDelete,
    handleCardLike,
  }) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;

    this._userId = userId;
    this._selectors = cardSelectors;

    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;

    this._card = document
      .querySelector(this._selectors.template)
      .content.querySelector(this._selectors.cardBlank)
      .cloneNode(true);
    this._cardImage = this._card.querySelector(this._selectors.cardImage);
    this._cardTitle = this._card.querySelector(this._selectors.cardTitle);
    this._buttonLike = this._card.querySelector(this._selectors.buttonLike);
    this._buttonDelete = this._card.querySelector(this._selectors.buttonDelete);
    this._likeCounter = this._card.querySelector(this._selectors.likeCounter);
  }

  generateCard() {
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this.countLikes(this._likes);

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._buttonLike.addEventListener('click', () => {
      this._handleCardLike();
    });

    this._buttonDelete.addEventListener('click', () => {
      this._handleCardDelete();
    });

    this._removeButtonDelete();
    this._setLikeActive();
  }

  deleteCard() {
    this._card.remove();
  }

  _removeButtonDelete() {
    if (this._userId !== this._ownerId) {
      this._buttonDelete.remove();
    }
  }

  updateLikes(data) {
    this._likes = data.likes;
  }

  addLike() {
    this._buttonLike.classList.add(this._selectors.likeActive);
  }

  deleteLike() {
    this._buttonLike.classList.remove(this._selectors.likeActive);
  }

  checkLikeSetted() {
    return this._likes.some((item) => {
      return item._id.includes(this._userId);
    });
  }

  _setLikeActive() {
    if (this.checkLikeSetted()) {
      this.addLike();
    } else {
      this.deleteLike();
    }
  }

  countLikes(likes) {
    this._likeCounter.textContent = likes.length;
  }
}
