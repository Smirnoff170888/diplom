/**
 * @module {SearchNewsController} SearchNewsController
 */

/**
 * Контроллер поиска NewsApi, хранит параметры запроса, а также текущее положение среди полученных результатов
 */
export default class SearchNewsController {
    /**
     * @param {Object} params Параметры поиска 
     * @param {NewsAPI} api API для запросов на newsapi.org
     */
    constructor(params, api) {
        /**
         * @member _api {NewsAPI} endpoint для newsapi.org 
         * @private
         */
        this._api = api;
        /**
         * @member _searchParams {Object} параметры поиска
         * @private
         */
        this._searchParams = params;
    }

    /**
     * Осуществляет настройку параметров поиска, после чего выполняет первычный запрос (page = 0) к поисковой системе
     * @param {String} query Текст запроса
     * @public
     */
    async newSearch(query) {
        this._searchParams.q = query;
        this._searchParams.from = Date.now() - config.search.msBefore;
        this._searchParams.to = Date.now();
        this._searchParams.totalResults = 0;
        this._searchParams.currentPage = 0;
        await this.searchNext();
    }

    /**
     * Осуществляет поиск следующей страницы результатов
     * @public
     */
    async searchNext() {
        this._onQueryStart();
        const news = await this._api.searchNews({
            q: encodeURIComponent(this._searchParams.q),
            from: new Date(this._searchParams.from).toISOString(),
            to: new Date(this._searchParams.to).toISOString(),
            pageSize: config.search.pageSize,
            page: this._searchParams.currentPage + 1
        });

        if (news) {
            this._searchParams.totalResults = news.totalResults;
            this._searchParams.currentPage++;
    
            if (this._searchParams.totalResults && news.articles)
                for (let i in news.articles)
                    this._onNewsFound(news.articles[i], this._searchParams);    
        }
        this._onQueryEnd();
    }

    /**
     * Вызывается в момент обнаружения новой новости
     * @param {Function} cb Функция, которая будет зарегистрированая как коллбек
     * @event
     * @public
     */
    set onNewsFound(cb) {
        this._onNewsFound = cb;
    }

    /**
     * Вызывается перед началом запроса данных с сервера
     * @param {Function} cb Функция, которая будет зарегистрированая как коллбек
     * @event
     * @public
     */
    set onQueryStart(cb) {
        /**
         * @member _onQueryStart {Function} Callback, вызываемый при QueryStart
         * @private
         */
        this._onQueryStart = cb;
    }

    /**
     * Вызывается при получении результатов от сервера
     * @param {Function} cb Функция, которая будет зарегистрированая как коллбек
     * @event
     * @public
     */
    set onQueryEnd(cb) {
        /**
         * @member _onQueryEnd {Function} Callback, вызываемый при QueryEnd
         * @private
         */
        this._onQueryEnd = cb;
    }

    /**
     * @member totalResults {Number} Всего найденных новостей
     * @public
     */
    get totalResults() {
        return this._searchParams.totalResults;
    }
}