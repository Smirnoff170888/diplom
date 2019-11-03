/**
 * @module {Info} Info
 */

import FixedComponent from '../../modules/FixedComponent.js';
import Utils from '../../modules/helpers/Utils.js';

/**
 * Блок, в котором отображается общая статистика об упоминаниях запроса в результатах новостей
 * @extends FixedComponent
 */
export default class Info extends FixedComponent {
    /**
     * @param {NodeElement|String} elem Селектор компонента
     * @param {Object} data Данные о результатах поиска
     */
    constructor(elem, data) {
        super(elem, data);
        this._el.queryText = Utils.nodeElements('#queryText', this._container);
        this._el.totalText = Utils.nodeElements('#findTotal', this._container);
        this._el.headersText = Utils.nodeElements('#findHeaders', this._container);
        this._calculate();
    }

    /**
     * Вычисление данных об упоминаниях
     * @private
     */
    _calculate() {
        this._totalResults = this._data.data.length;
        this._inHeaders = this._data.data.reduce((acc, news) => {
            return acc + new RegExp(`${this._data.params.q}`, 'i').test(news.title);
        }, 0);
    }

    /**
     * Функция рендеринга компонента
     * @public
     */
    render() {
        this._el.queryText.textContent = this._data.params.q;
        this._el.totalText.textContent = this._totalResults;
        this._el.headersText.textContent = this._inHeaders;
    }
}