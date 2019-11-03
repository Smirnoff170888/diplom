/**
 * @module {Err} Err
 */
import DynamicComponent from '../../../modules/DynamicComponent.js';

/**
 * Компонент Err (ошибка), рендерит на странице элемент с текстом ошибки
 * @extends DynamicComponent
 */
export default class Err extends DynamicComponent {
    /**
     * 
     * @param {Object} data Данные об ошибке
     * @param {NodeElement} container Родительский контейнер, в конец которого будет рендерится компонент
     * @param {Object} events Список событий (необходим timeout)
     */
    constructor(data, container, events) {
        super(data, container);
        setTimeout(events.timeout, 3000);
    }

    createDom() {
        const elem = document.createElement('span');
        elem.classList = 'error__err';
        elem.textContent = this._data.text;
        return elem;
    }
}