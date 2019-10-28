/**
 * @module {FixedComponent} FixedComponent
 */

import Utils from './helpers/Utils.js';

/**
 * Базовый компонент, который создается на готовом DOM
 */
export default class FixedComponent {
    /**
     * @param {String|NodeElement} elem Селектор DOM-элемента, служащего базой для компонента
     * @param {?Object} data Данные, необходимые компоненту
     * @param {?Object} events Регистрируемые коллбеки событий для данного компонента
     */
    constructor(elem, data = {}, events = {}) {
        /**
         * @member {NodeElement} _fContainer Базовый DOM-элемент компонента
         * @private
         */
        this._fContainer = Utils.nodeElements(elem);
        /**
         * @member {Object} _fData Данные, необходимые компоненту
         * @private
         */
        this._fData = data;
        /**
         * @member {Object} _fEvents Список зарегистрированных коллбеков
         * @private
         */
        this._fEvents = events;
        /**
         * @member {Object} _fEl Дочерние элементы компонента (например элементы у блока)
         * @private
         */
        this._fEl = {};
    }

    /**
     * Доступ к базовому контейнеру
     * @member {NodeElement} _container Базовый DOM-элемент компонента
     * @protected
     */
    get _container() { //protected
        return this._fContainer;
    }

    /**
     * Доступ к данным компонента
     * @member {Object} _data Данные компонента
     * @protected
     */
    get _data() { //protected
        return this._fData;
    }

    /**
     * Доступ к событиям компонента
     * @member {Object} _events События компонента
     * @protected
     */
    get _events() { //protected
        return this._fEvents;
    }

    /**
     * Доступ к дочерним элементам контейнера
     * @member {Object} _el Дочерние элементы контейнера
     * @protected
     */
    get _el() { //protected
        return this._fEl;
    }

    /**
     * Скрывает компонент в DOM-дереве
     * @public
     */
    hide() {
        if (!this._container.classList.contains('hide'))
            this._container.classList.add('hide');
    }

    /**
     * Показывает компонент в DOM-дереве
     * @public
     */
    show() {
        if (this._container.classList.contains('hide'))
            this._container.classList.remove('hide');
    }

    /**
     * Рендерит компонент
     * @abstract
     * @protected
     */
    render() { //abstract
        throw new Error('Функция render() не реализована у компонента');
    }
}