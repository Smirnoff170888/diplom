/**
 * @module {Search} Search
 */

import FixedComponent from '../../modules/FixedComponent.js';
import Utils from '../../modules/helpers/Utils.js';

/**
 * Компонент поисковой формы, управляет поведением формы и валидирует данные
 * @extends FixedComponent
 */
export default class Search extends FixedComponent {
    /**
     * @param {String|NodeElement} elem Селектор DOM-элемента, служащего базой для компонента
     * @param {Object} data Данные, необходимые компоненту
     */
    constructor(elem, data) {
        super(elem, data);
        /**
         * @member {Set} _errorsSet Список полей, которые не проходят валидацию
         * @private
         */
        this._errorsSet = new Set();
        /**
         * @member {Array} _inputHandlers Массив обработчиков элементов формы
         * @private
         */
        this._inputHandlers = new Array();
        /**
         * @member {NodeElement} _errorText DOM-элемент, в который отображается ошибка ввода
         * @private
         */
        this._errorText = Utils.nodeElements('.search__error', this._container);
        if (data.q) this._container['item'].value = data.q;
        /**
         * Валидирует все поля формы
         * @method validate
         * @public
         */
        this.validate = () => this._inputHandlers.forEach((inputHandler) => inputHandler());
        /**
         * Сбрасывает состояние формы
         * @method reset
         * @public
         */
        this.reset = () => {
            this._container.reset();
            this._submit.disabled = false;
        };

        this._container.forEach((elem) => {
            if (elem.tagName == 'INPUT') this._initInputHandler(elem);
            if (elem.tagName == 'BUTTON' && elem.type == 'submit') this._submit = elem;
        });

        this._container.addEventListener('submit', this._submitHander.bind(this));
        this._container.addEventListener('focus', this.validate());
    }

    /**
     * Устанавливает обработчик ввода на входящий input
     * @param {NodeElement} elem Элемент типа input
     * @private
     */
    _initInputHandler(elem) {
        const validateInput = () => {
            this._inputHandler(elem);
            this._submit.disabled = this._errorsSet.size > 0;
        };
        elem.addEventListener('input', validateInput);
        this._inputHandlers.push(validateInput);
    }

    /**
     * Обработчик submit формы, вызывает onSearch
     * @param {Event} event Событие submit
     * @private
     */
    _submitHander(event) {
        event.preventDefault();
        this._onSearch(this._container['item'].value);
    }

    /**
     * событие Search, вызывается при прохождении валидации и submit формы
     * @param {Function} cb Функция, которая будет зарегистрированая как коллбек
     * @event
     * @public
     */
    set onSearch(cb) {
        /**
         * @member {Function} _onSearch Callback, вызываемый при Search
         */
        this._onSearch = cb;
    }

    /**
     * Разблокирует все элементы формы
     * @public
     */
    enable() {
        this._container.forEach((elem) => elem.disabled = false);
    }

    /**
     * Блокирует все элементы формы
     * @public
     */
    disable() {
        this._container.forEach((elem) => elem.disabled = true);
    }

    /**
     * Валидирует элемент формы
     * @param {NodeElement} elem Элемент формы для валидации
     * @private
     */
    _inputHandler(elem) {
        const minLength = elem.getAttribute('minlength');
        const maxLength = elem.getAttribute('maxlength');
        const pattern = elem.getAttribute('pattern');
        const errHelper = (errText) => {
            elem.classList.add('search__input_error');
            this._errorText.textContent = errText;
            this._errorsSet.add(elem);
            return;
        };

        if (!elem.value.length)
            return errHelper('Это обязательное поле');

        if (minLength && elem.validity.tooShort)
            return errHelper(`Должно быть от ${minLength} до ${maxLength} символов`);

        if (pattern && elem.validity.patternMismatch)
            return errHelper('Введите нормальный текст');
        elem.classList.remove('search__input_error');
        this._errorsSet.delete(elem);
        this._errorText.textContent = '';
    }
}