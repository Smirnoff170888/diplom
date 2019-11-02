/**
 * @module {DynamicComponent} DynamicComponent 
 */

/**
 * Базовый компонент, который рендерится в момент своего создания
 */
export default class DynamicComponent {
    /**
     * @param {Object} data Данные, необходимые компоненту
     * @param {NodeElement} container Родительский контейнер, в конец которого будет рендерится компонент
     */
    constructor(data, container) {
        /**
         * @member {Object} _fData Данные, необходимые компоненту
         * @private
         */
        this._fData = data;
        /**
         * @member {NodeElement} _fElem DOM-дерево компонента
         * @private
         */
        this._fElem = this.createDom();
        /**
         * @member {NodeElement} _fContainer Родительский компонент
         * @private
         */
        this._fContainer = container;
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
     * Доступ к DOM-элементу компонента
     * @member {NodeElement} _elem Dom-элемент компонента
     * @protected
     */
    get _elem() { //protected
        return this._fElem;
    }

    /**
     * Доступ к родительскому элементу компонента
     * @member {NodeElement} _container Dom-родитель компонента
     * @protected
     */
    get _container() { //protected
        return this._fContainer;
    }

    /**
     * Создаем DOM-дерево компонента
     * @abstract
     * @protected
     */
    createDom() {
        throw new Error('Функция createDom() не реализована у компонента');
    }

    /**
     * Добавляет компонент в конец родительского контейнера
     * @public
     */
    render() {
        this._container.appendChild(this._elem);
    }

    /**
     * Уничтожает свое DOM-дерево, деструктор
     * @public
     */
    destroy() {
        this._elem.remove();
    }
}