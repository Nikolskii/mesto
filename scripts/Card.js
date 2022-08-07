export class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
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

    this._card.querySelector('.element__image').src = this._link;
    this._card.querySelector('.element__image').alt = this._name;
    this._card.querySelector('.element__title').textContent = this._name;

    return this._card;
  }
}
