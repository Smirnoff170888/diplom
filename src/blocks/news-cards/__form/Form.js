import FixedComponent from '../../../modules/FixedComponent.js';

export default class Form extends FixedComponent {
    constructor(elem, data, events) {
        super(elem, data, events);
        this._container.addEventListener('submit', (event) => {
            event.preventDefault();
            this._events.submit();
        });
    }
}