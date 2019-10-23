import FixedComponent from '../../modules/FixedComponent.js';
import Utils from '../../modules/helpers/Utils.js';

export default class Info extends FixedComponent {
    constructor(elem, data) {
        super(elem, data);
        this._el.queryText = Utils.nodeElements('#queryText', this._container);
        this._el.totalText = Utils.nodeElements('#findTotal', this._container);
        this._el.headersText = Utils.nodeElements('#findHeaders', this._container);
        this._calculate();
    }

    _calculate() {
        this._totalResults = this._data.data.length;
        this._inHeaders = this._data.data.reduce((acc, news) => {
            return acc + new RegExp(`${this._data.params.q}`, 'i').test(news.title);
        }, 0);
    }

    render() {
        this._el.queryText.textContent = this._data.params.q;
        this._el.totalText.textContent = this._totalResults;
        this._el.headersText.textContent = this._inHeaders;
    }
}