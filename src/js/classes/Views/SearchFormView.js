import Utils from '../../helpers/Utils.js';

export default class SearchFormView {
    constructor(data, elems) {
        this._el = Utils.nodeElements(elems);
        this._el.searchForm.addEventListener('submit', this._submitHander.bind(this));
        if (data.q) this._el.searchForm['item'].value = data.q;
    }

    _submitHander(event) {
        event.preventDefault();
        this._onSearch(this._el.searchForm['item'].value);
    }

    set onSearch(cb) {
        this._onSearch = cb;
    }
}