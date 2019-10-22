export default class SearchNewsController {
    constructor(params, api) {
        this._api = api;
        this._searchParams = params;
    }

    async newSearch(query) {
        this._searchParams.q = query;
        this._searchParams.from = Date.now() - 60*60*24*7*1000;
        this._searchParams.to = Date.now();
        this._searchParams.totalResults = 0;
        this._searchParams.currentPage = 0;
        await this.searchNext();
    }

    async searchNext() {
        this._onQueryStart();
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
                this._onNewsFound(news.articles[i], this._searchParams);
        this._onQueryEnd();
    }

    set onNewsFound(cb) {
        this._onNewsFound = cb;
    }

    set onQueryStart(cb) {
        this._onQueryStart = cb;
    }

    set onQueryEnd(cb) {
        this._onQueryEnd = cb;
    }

    get totalResults() {
        return this._searchParams.totalResults;
    }
}