import FixedComponent from '../../modules/FixedComponent.js';

export default class Search extends FixedComponent {
    constructor(elem, data) {
        super(elem, data);
        this._container.addEventListener('submit', this._submitHander.bind(this));
        if (data.q) this._container['item'].value = data.q;
    }

    _submitHander(event) {
        event.preventDefault();
        this._onSearch(this._container['item'].value);
    }

    set onSearch(cb) {
        this._onSearch = cb;
    }
}