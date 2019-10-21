import AbstractComponent from './AbstractComponent.js';

export default class ErrorLineComponent extends AbstractComponent {
    constructor(data, container) {
        (container) ? super(data, container) : super(data, document.querySelector('.error'));
        setTimeout(() => this.destroy(), 5000);
    }

    createDom() {
        const elem = document.createElement('span');
        elem.classList = 'error__err';
        elem.textContent = this._data.text;
        return elem;
    }
}