/**
 * @module
 */

import FixedComponent from '../../modules/FixedComponent.js';
import CirclePreloader from './__circle-preloader/CirclePreloader.js';
import Form from './__form/Form.js';
import NotFound from './__not-found/NotFound.js';
import Card from './__card/Card.js';
import Container from './__container/Container.js';
import Utils from '../../modules/helpers/Utils.js';

export default class NewsCards extends FixedComponent {
    /**
     * 
     * @param {String|NodeElement} elem Селектор DOM-элемента, служащего базой для компонента
     * @param {Array} data Массив новостей
     */
    constructor(elem, data) {
        super(elem, data);
        /**
         * Элемент Прелоудер
         * @member {CirclePreloader} _preloader Прелоудер крутится, запросы мутятся
         * @private
         */
        this._preloader = new CirclePreloader(Utils.nodeElements('.news-cards__search', this._container));
        /**
         * Элемент Не найдено
         * @member {NotFound} _notFound Элемент "не найдено"
         * @private
         */
        this._notFound = new NotFound(Utils.nodeElements('.news-cards__not-found', this._container));
        /**
         * Элемент Контейнер
         * @member {Container} _cardsContainer Контейнер, в котором рендерятся карточки с новостями
         * @private
         */
        this._cardsContainer = new Container(Utils.nodeElements('.news-cards__container', this._container));
        /**
         * Элемент Показать еще
         * @member {Form} _loadNext Кнопка "показать еще"
         * @private
         */
        this._loadNext = new Form(Utils.nodeElements('.news-cards__form', this._container), null, {
            submit: () => this.renderNext()
        });
        this._cardsContainer.cardRenderer = (data, container) => new Card(data, container);
        /**
         * Количество отрендеренных новостей
         * @member {Number} _renderedNews Количество отрендеренных новостей
         * @private
         */
        this._renderedNews = 0;
    }

    /**
     * @member {Function} totalNews Возвращает суммарное количество новостей
     * @public
     */
    set totalNews(cb) {
        /**
         * Функция, возвращающая суммарное количество новостей
         * @member {Function} _totalNews Функция, возвращающая суммарное количество новостей
         */
        this._totalNews = cb;
    }

    /**
     * Вызывается при получении новых новостей
     * @param {Function} cb Функция, которая будет зарегистрированая как коллбек
     * @event
     * @public
     */
    set onLoadMore(cb) {
        /**
         * @member {Function} _onLoadMore Callback, вызываемый при LoadMore
         * @private
         */
        this._onLoadMore = cb;
    }

    /**
     * Вызывается перед рендером новой порции новостей, показывает себя, скрывает прелоудер 
     * @private
     */
    _beforeRenderNext() {
        this.show();
        this._loadNext.hide();
    }

    /**
     * Вызывается после рендера новостей, показывает/скрывает элементы, согласно количество новостей
     * @private
     */
    _afterRenderNext() {

        (this._totalNews() === 0) ? this._notFound.show() : this._notFound.hide();
        (typeof(this._totalNews()) === 'undefined') ? this.hide() : this.show();
        (this._renderedNews < this._totalNews()) ? this._loadNext.show() : this._loadNext.hide();
    }

    /**
     * Рендерит порцию новостей, синоним для renderNext()
     * @public
     */
    render() {
        this.renderNext();
    }

    /**
     * Отрисовывает новую порцию новостей, высчитывает нужное количество, если нужно - запрашивает их из внешнего источника
     * Скрывает/показывает элементы, согласно стадии отрисовки новостей
     * @public
     */
    async renderNext() {
        this._beforeRenderNext();
        const needToAchive = Math.min(this._renderedNews + config.news.countPerShow, this._totalNews());

        if (needToAchive > this._data.length && this._data.length < this._totalNews())
            await this._onLoadMore();

        for (let i = this._renderedNews; i < needToAchive; i++) {
            this._renderedNews++;
            this._cardsContainer.render(this._data[i]);
        }

        this._afterRenderNext();
    }

    /**
     * Добавляет новость в массив новостей на отрисовку
     * @param {Object} data Новость
     * @public
     */
    addNews(data) {
        this._data.push(data);
    }

    /**
     * Показать прелоудер
     * @public
     */
    showPreloader() {
        this._preloader.show();
        this.show();
    }

    /**
     * Скрыть прелоудер
     * @public
     */
    hidePreloader() {
        this._preloader.hide();
    }

    /**
     * Очистить компонент от всех новостей
     * @public
     */
    clear() {
        this._renderedNews = 0;
        this._data.length = 0;
        this._cardsContainer.clear();
        this._notFound.hide();
    }
}