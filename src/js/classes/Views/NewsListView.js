import Utils from '../../helpers/Utils.js';

export default class NewsListView {
    constructor(data, elems) {
        this._el = Utils.nodeElements(elems);
        this.clear();
        data.forEach((news) => this.addNews(news));
        this._el.loadNextContainer.addEventListener('submit', this._handleLoadNext.bind(this));
    }

    _handleLoadNext(event) {
        event.preventDefault();
        this.renderNext();
    }

    set renderer(generator) {
        this._cardGenerator = generator;
    }

    set totalNews(cb) {
        this._totalNews = cb;
    }

    set onLoadMore(cb) {
        this._onLoadMore = cb;
    }

    _beforeRenderNext() {
        this._el.globalContainer.style.display = 'block';
        this._el.loadNextContainer.style.display = 'none';
    }

    _afterRenderNext() {
        if (this._totalNews() === 0) {
            this._el.notFoundContainer.style.display = 'flex';
        } else if (this._el.notFoundContainer.style.display != 'none') {
            this._el.notFoundContainer.style.display = 'none';
        }
    
        if (typeof(this._totalNews()) === 'undefined')
            this._el.globalContainer.style.display = 'none';
        else if (this._el.globalContainer.style.display == 'none')
            this._el.globalContainer.style.display = 'block';

        if (this._renderedNews > 0 &&  this._el.newsResultsContainer.style.display == 'none')
            this._el.newsResultsContainer.style.display = 'flex';
 
        if (this._renderedNews == 0 && this._el.newsResultsContainer.style.display != 'none')
            this._el.newsResultsContainer.style.display = 'none';

        if (this._renderedNews < this._totalNews())
            this._el.loadNextContainer.style.display = 'block';
    }

    async renderNext() {
        this._beforeRenderNext();
        const needToAchive = Math.min(this._renderedNews + 3, this._totalNews());

        if (needToAchive > this._data.length && this._data.length < this._totalNews())
            await this._onLoadMore();

        for (let i = this._renderedNews; i < needToAchive; i++) {
            this._renderedNews++;
            this._newsCards.push(this._cardGenerator(this._data[i], this._el.newsContainer));
        }

        this._afterRenderNext();
    }

    addNews(data) {
        this._data.push(data);
    }

    clear() {
        this._renderedNews = 0;
        this._data = [];
        if (this._newsCards) this._newsCards.forEach((card) => card.destroy());
        this._newsCards = [];
        this._el.newsResultsContainer.style.display = 'none';
        this._el.notFoundContainer.style.display = 'none';
    }
}