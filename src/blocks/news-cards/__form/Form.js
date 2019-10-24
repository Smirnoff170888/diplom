import FixedComponent from '../../../modules/FixedComponent.js';

export default class Form extends FixedComponent {
    constructor(elem, data, events) {
        super(elem, data, events);
        this._container.addEventListener('submit', this._submitHandler.bind(this));
    }

    _submitHandler(event) {
        event.preventDefault();
        this._events.submit();
    }
}