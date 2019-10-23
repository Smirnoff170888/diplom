import NewsApi from './classes/Api/NewsApi.js';
import SearchNewsController from './classes/Controllers/SearchNewsController.js';
import StorageController from './classes/Controllers/StorageController.js';

import NewsCards from '../blocks/news-cards/NewsCards.js';
import Search from '../blocks/search/Search.js';
import Error from '../blocks/error/Error.js';

const newsAPI = new NewsApi(config.api.news.token);
const storageController = new StorageController();
const cachedData = storageController.getData();
const searchNewsController = new SearchNewsController(cachedData.params, newsAPI);

const newsCards = new NewsCards('.news-cards', cachedData.data);
const search = new Search('.search__search-field', cachedData.params);
const errorHandler = new Error('.error');

newsAPI.onError = (text) => errorHandler.error(text);

searchNewsController.onNewsFound = (news, params) => {
    storageController.saveData(news, params);
    newsCards.addNews(news);
};

searchNewsController.onQueryStart = () => {
    newsCards.showPreloader();
    search.disable();
};
searchNewsController.onQueryEnd = () => {
    newsCards.hidePreloader();
    search.enable();
};

search.onSearch = async (query) => {
    storageController.initCache();
    newsCards.clear();
    await searchNewsController.newSearch(query);
    newsCards.renderNext();
};

newsCards.onLoadMore = async () => await searchNewsController.searchNext();
newsCards.totalNews = () => searchNewsController.totalResults;

newsCards.render();