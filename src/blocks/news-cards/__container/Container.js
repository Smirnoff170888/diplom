/**
 * @module {Container} Container
 */

import FixedComponent from '../../../modules/FixedComponent.js';
import Utils from '../../../modules/helpers/Utils.js';

/**
 * Компонент - Контейнер новостных карточек
 * @extends FixedComponent
 */
export default class Container extends FixedComponent {
    /**
     * @param {String|NodeElement} elem Селектор DOM-элемента, служащего базой для компонента
     */
    constructor(elem) {
        super(elem);
        /**
         * @member {Array} _cards Массив элементов новостных карточек
         * @private
         */
        this._cards = [];
        /**
         * @member {NodeElement} _resContainer DOM-элемент, в который рендерятся карточки
         * @private
         */
        this._resContainer = Utils.nodeElements('.news-cards__item', this._container);
    }

    /**
     * @member {Function} cardRenderer Функция, возвращающая компонент карточки
     * @public
     */
    set cardRenderer(cb) {
        /**
         * @member {Function} _renderer Функция, возвращающая компонент карточки
         * @private
         */
        this._renderer = cb;
    }

    /**
     * Рендерит карточку
     * @param {Object} data Данные для компонента карточки
     * @public
     */
    render(data) {
        this.show();
        const card = this._renderer(data, this._resContainer);
        this._cards.push(card);
        card.render();
    }

    /**
     * Очищает компонент от всех керточек новостей
     * @public
     */
    clear() {
        if (this._cards) this._cards.forEach((card) => card.destroy());
        this._cards = [];
        this.hide();
    }
}