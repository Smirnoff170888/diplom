export default class NewsController {
    constructor({ search, next, preloader, empty }, { max }, api) {
        this._api = api;
        this._nextForm = next;
        this._preloadContainer =  preloader;
        this._searchForm = search;
        this._notFound = empty;
        this._newsPerPage = max;
        this._searchForm.addEventListener('submit', this._searchFormHandler.bind(this));
        this._nextForm.addEventListener('submit', this._nextFormHander.bind(this));

        this._resetSearch();
    }

    _searchFormHandler(event) {
        event.preventDefault();
        this._searchQuery = this._searchForm['item'].value;
        this._fromDate = new Date(Date.now() - 60*60*24*7*1000);
        this._toDate = new Date(Date.now());
        this._resetSearch();
        this._loadNext();
    }

    _nextFormHander(event) {
        event.preventDefault();
        this._loadNext();
    }

    _resetSearch() {
        for (let i in this._newsItems) {
            this._newsItems[i].destroy();
        }
        this._newsItems = [];
        this._totalNews = 0;
        this._currentPage = 0;

        this._nextForm.style.display = 'none';
        this._notFound.style.display = 'none';
    }

    async _loadNext() {
        this._preloadContainer.style.display = 'block';

        const news = await this._api.searchNews({
            q: encodeURIComponent(this._searchQuery),
            from: this._fromDate.toISOString(),
            to: this._toDate.toISOString(),
            pageSize: this._newsPerPage,
            page: this._currentPage + 1
        });

        this._totalNews = news.totalResults;
        this._currentPage++;

        if (!this._totalNews)
            this._notFound.style.display = 'flex';
        if (this._totalNews && news.articles)
            for (let i in news.articles) this._newsItems.push(this._onNewsFound(news.articles[i]));
        if (this._totalNews > this._newsItems.length)
            this._nextForm.style.display = 'block';
        else this._nextForm.style.display = 'none';
        this._preloadContainer.style.display = 'none';
    }

    set onNewsFound(cb) {
        this._onNewsFound = cb;
    }
}