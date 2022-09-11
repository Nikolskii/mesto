export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderItems(cards) {
    cards.forEach((card) => {
      this._renderer(card);
    });
  }

  addItem(card) {
    this._container.prepend(card);
  }
}
