import { createElement } from '../utils/utils.js';

export default class Abstract {
  constructor() {
    if (new.target === Abstract) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  show() {
    if (this._element) {
      this._element.classList.remove('visually-hidden');
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add('visually-hidden');
    }
  }

  renderElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  shake(element, callback) {
    const TIME_ANIMATION = 600;
    element.style.animation = `shake ${TIME_ANIMATION / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = '';
      callback();
    }, TIME_ANIMATION);
  }
}
