import DynamicComponent from '../../../modules/DynamicComponent.js';

export default class Err extends DynamicComponent {
    constructor(data, container, events) {
        super(data, container);
        setTimeout(events.timeout, 3000);
    }

    createDom() {
        const elem = document.createElement('span');
        elem.classList = 'error__err';
        elem.textContent = this._data.text;
        return elem;
    }
}