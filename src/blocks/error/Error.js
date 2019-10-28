/**
 * @module {Error} Error
 */
import FixedComponent from '../../modules/FixedComponent.js';
import Err from './__err/Err.js';

/**
 * Компонент ошибок и предупреждений
 * @extends FixedComponent
 * */
export default class Error extends FixedComponent {
    /**
     * @param {String|NodeElement} elem Селектор DOM-элемента, служащего базой для компонента
     */
    constructor(elem) {
        super(elem);
        /**
         * @member {Number} _errCounter Число отображаемых ошибок
         * @private
         */
        this._errCounter = 0;
    }

    /**
     * Выводит новый компонент Err с указанным текстом
     * @param {String} text Текст ошибки
     * @public
     */
    add(text) {
        this.show();
        this._errCounter++;
        const err = new Err({text: text}, this._container, {
            timeout: () => {
                err.destroy();
                this._errCounter--;
                if (!this._errCounter) this.hide();
            }
        });
        err.render();
    }
}