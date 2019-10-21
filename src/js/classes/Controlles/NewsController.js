export default class NewsController {
    constructor({ search, next, preloader, empty }, params, api) {
        this._api = api;
        this._elNextForm = next;
        this._elPreloadContainer =  preloader;
        this._elSearchForm = search;
        this._elNotFound = empty;
        this._searchParams = params;
        this._newsItems = [];
        this._elSearchForm.addEventListener('submit', this._searchFormHandler.bind(this));
        this._elNextForm.addEventListener('submit', this._nextFormHander.bind(this));
    }

    _searchFormHandler(event) {
        event.preventDefault();
        this._searchParams.q = this._elSearchForm['item'].value;
        this._searchParams.from = Date.now() - 60*60*24*7*1000;
        this._searchParams.to = Date.now();
        this._resetSearch();
        this._searchNext();
    }

    _nextFormHander(event) {
        event.preventDefault();
        this._searchNext();
    }

    _resetSearch() {
        for (let i in this._newsItems) {
            this._newsItems[i].destroy();
        }
        this._newsItems = [];
        this._searchParams.totalResults = 0;
        this._searchParams.currentPage = 0;

        this._onResetSearch();
    }

    async _searchNext() {
        this._elPreloadContainer.style.display = 'block';

        const news = await this._api.searchNews({
            q: encodeURIComponent(this._searchParams.q),
            from: new Date(this._searchParams.from).toISOString(),
            to: new Date(this._searchParams.to).toISOString(),
            pageSize: this._searchParams.newsPerPage,
            page: this._searchParams.currentPage + 1
        });

        this._searchParams.totalResults = news.totalResults;
        this._searchParams.currentPage++;

        if (this._searchParams.totalResults && news.articles)
            for (let i in news.articles)
                this._newsItems.push(this._onNewsFound(news.articles[i], this._searchParams));

        this.redraw();
    }

    set onNewsFound(cb) {
        this._onNewsFound = cb;
    }

    set onResetSearch(cb) {
        this._onResetSearch = cb;
    }

    addManual(data) {
        this._newsItems.push(data);
    }

    redraw() {
        if (this._searchParams.totalResults === 0)
            this._elNotFound.style.display = 'flex';
        if (this._searchParams.totalResults > this._newsItems.length)
            this._elNextForm.style.display = 'block';
        else this._elNextForm.style.display = 'none';
        this._elPreloadContainer.style.display = 'none';
        if (this._searchParams.q) this._elSearchForm['item'].value = this._searchParams.q;
    }

}