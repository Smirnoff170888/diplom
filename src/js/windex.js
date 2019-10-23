import NewsApi from './classes/Api/NewsApi.js';
import SearchNewsController from './classes/Controllers/SearchNewsController.js';
import StorageController from './classes/Controllers/StorageController.js';

import NewsCards from '../blocks/news-cards/NewsCards.js';
import Search from '../blocks/search/Search.js';

const newsAPI = new NewsApi('94ad67b6000f42d886d0825e6b9cd7c0');
const storageController = new StorageController();
const cachedData = storageController.getData();
let newsParams = cachedData.params;
if (!newsParams) newsParams = { newsPerPage: 20 };
const searchNewsController = new SearchNewsController(newsParams, newsAPI);

const newsCards = new NewsCards('.news-cards', cachedData.data);
const search = new Search('.search__search-field', cachedData.params);

searchNewsController.onNewsFound = (news, params) => {
  storageController.saveData(news, params);
  newsCards.addNews(news);
};

searchNewsController.onQueryStart = () =>newsCards.showPreloader();
searchNewsController.onQueryEnd = () => newsCards.hidePreloader();

search.onSearch = async (query) => {
  storageController.initCache();
  newsCards.clear();
  await searchNewsController.newSearch(query);
  newsCards.renderNext();
};

newsCards.onLoadMore = async () => await searchNewsController.searchNext();
newsCards.totalNews = () => searchNewsController.totalResults;

newsCards.render();