export default class Section {
  constructor({ data, renderer }, container) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  // renderItems(cards) {
  //   cards.forEach((item) => {
  //     this._renderer(item);
  //   });
  // }

  addItem(element) {
    this._container.prepend(element);
  }
}
