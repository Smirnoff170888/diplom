import FixedComponent from '../../modules/FixedComponent.js';
import CirclePreloader from './__circle-preloader/CirclePreloader.js';
import Form from './__form/Form.js';
import NotFound from './__not-found/NotFound.js';
import Card from './__card/Card.js';
import Container from './__container/Container.js';
import Utils from '../../modules/helpers/Utils.js';

export default class NewsCards extends FixedComponent {
    constructor(elem, data) {
        super(elem, data);
        this._preloader = new CirclePreloader(Utils.nodeElements('.news-cards__search', this._container));
        this._notFound = new NotFound(Utils.nodeElements('.news-cards__not-found', this._container));
        this._cardsContainer = new Container(Utils.nodeElements('.news-cards__container', this._container));
        this._loadNext = new Form(Utils.nodeElements('.news-cards__form', this._container), null, {
            submit: () => this.renderNext()
        });
        this._cardsContainer.cardRenderer = (data, container) => new Card(data, container);
        this._renderedNews = 0;
    }

    set totalNews(cb) {
        this._totalNews = cb;
    }

    set onLoadMore(cb) {
        this._onLoadMore = cb;
    }

    _beforeRenderNext() {
        this.show();
        this._loadNext.hide();
    }

    _afterRenderNext() {

        (this._totalNews() === 0) ? this._notFound.show() : this._notFound.hide();
        (typeof(this._totalNews()) === 'undefined') ? this.hide() : this.show();
        (this._renderedNews < this._totalNews()) ? this._loadNext.show() : this._loadNext.hide();
    }

    render() {
        this.renderNext();
    }

    async renderNext() {
        this._beforeRenderNext();
        const needToAchive = Math.min(this._renderedNews + 3, this._totalNews());

        if (needToAchive > this._data.length && this._data.length < this._totalNews())
            await this._onLoadMore();

        for (let i = this._renderedNews; i < needToAchive; i++) {
            this._renderedNews++;
            this._cardsContainer.render(this._data[i]);
        }

        this._afterRenderNext();
    }

    addNews(data) {
        this._data.push(data);
    }

    showPreloader() {
        this._preloader.show();
        this.show();
    }

    hidePreloader() {
        this._preloader.hide();
    }

    clear() {
        this._renderedNews = 0;
        this._data = [];
        this._cardsContainer.clear();
        this._notFound.hide();
    }
}