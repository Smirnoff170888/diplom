/**
 * @module {Form} Form
 */
import FixedComponent from '../../../modules/FixedComponent.js';

/**
 * Компонент для отображения кнопки "Показать еще"
 * @extends FixedComponent
 */
export default class Form extends FixedComponent {
    /**
     * @param {String|NodeElement} elem Селектор DOM-элемента, служащего базой для компонента
     * @param {Object} data Данные, необходимые для работы компонента
     * @param {Object} events Регистрируемые коллбеки событий для данного компонента (submit)
     */
    constructor(elem, data, events) {
        super(elem, data, events);
        this._container.addEventListener('submit', this._submitHandler.bind(this));
    }

    /**
     * Обработчик события submit формы, вызывает коллбек submit компонента
     * @param {Event} event Событие
     * @private
     */
    _submitHandler(event) {
        event.preventDefault();
        this._events.submit();
    }
}