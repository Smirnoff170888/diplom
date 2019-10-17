export default class NewsController {
    constructor({ search, next, preloader }, api) {
        this._api = api;
        this._nextForm = next;
        this._preloadContainer =  preloader;
        this._searchForm = search;
        this._searchForm.addEventListener('submit', this._searchFormHandler.bind(this));
    }

    async _searchFormHandler(event) {
        event.preventDefault();
        this._preloadContainer.style.display = 'block';
        const news = await this._api.searchNews(this._searchForm['item'].value);
        for (let i in news.articles) this._onNewsFound(news.articles[i]);
        this._preloadContainer.style.display = 'none';
    }

    set onNewsFound(cb) {
        this._onNewsFound = cb;
    }
}