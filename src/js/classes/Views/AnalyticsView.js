/**
 * @module {AnalyticsView} AnalyticsView
 */

import Info from '../../../blocks/info/Info.js';
import Tabel from '../../../blocks/tabel/Tabel.js';

/**
 * View страницы аналитики
 * @deprecated Нужно как-то это переработать, не ложится в модель JS-BEM
 */
export default class AnalyticsView {
    /**
     * @param {Object} data Результаты поиска новостей
     * @param {Object} elems Селекторы для рендера компонент Tabel и Info
     */
    constructor(data, elems) {
        /**
         * Данные для рендеринга
         * @member {Object} _data Данные, необходимые для рендеринга
         * @private
         */
        this._data = data;
        /**
         * Компонент рендеринга - столбчатая диаграмма
         * @member {Tabel} _tabel Компонент рендеринга - столбчатая диаграмма
         * @private
         */
        this._tabel = new Tabel(elems.tabel, data);
        /**
         * Компонент рендеринга - информационный заголовок
         * @member {Info} _info Компонент рендеринга - информационный заголовок
         * @private
         */
        this._info = new Info(elems.info, data);
    }

    /**
     * Рендерит view
     * @public
     */
    render() {
        if (this._data.params.q) {
            this._info.render();
            this._tabel.render();    
        } else {
            this._info.hide();
            this._tabel.hide();
            this._onError('Ошибка загрузка кэша');
        }
    }

    /**
     * @param {Function} cb Коллбек, который будет вызван в случае возникновения ошибки (например отсутствия данных)
     * @event
     * @public
     */
    set onError(cb) {
        /**
         * @member {Function} _onError Коллбек, который будет вызван в случае возникновения ошибки (например отсутствия данных)
         * @private
         */
        this._onError = cb;
    }
}