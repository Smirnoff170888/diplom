import NewsApi from './classes/Api/NewsApi.js';
import NewsCardComponent from './classes/Components/NewsCardComponent.js';

import SearchNewsController from './classes/Controllers/SearchNewsController.js';
import StorageController from './classes/Controllers/StorageController.js';

import NewsListView from './classes/Views/NewsListView.js';
import SearchFormView from './classes/views/SearchFormView.js';


const elPreloadContainer = document.querySelector('.news-cards__search');
const elGlobalNewsContainer = document.querySelector('.news-cards');

const newsAPI = new NewsApi('94ad67b6000f42d886d0825e6b9cd7c0');
const storageController = new StorageController();
const cachedData = storageController.getData();
let newsParams = cachedData.params;
if (!newsParams) newsParams = { newsPerPage: 20 };

const newsListView = new NewsListView(cachedData.data, {
  globalContainer: elGlobalNewsContainer,
  newsResultsContainer: '.news-cards__container',
  newsContainer: '.news-cards__item',
  loadNextContainer: '.news-cards__form',
  notFoundContainer: '.news-cards__not-found',
});

const searchFormView = new SearchFormView(cachedData.params, {
  searchForm: '.search__search-field'
});

const searchNewsController = new SearchNewsController(newsParams, newsAPI);

searchNewsController.onNewsFound = (news, params) => {
  storageController.saveData(news, params);
  newsListView.addNews(news);
};

searchNewsController.onQueryStart = () => {
  if (elGlobalNewsContainer.style.display == 'none')
  elGlobalNewsContainer.style.display = 'block';
  elPreloadContainer.style.display = 'block';
}
searchNewsController.onQueryEnd = () => elPreloadContainer.style.display = 'none';

searchFormView.onSearch = async (query) => {
  storageController.initCache();
  newsListView.clear();
  await searchNewsController.newSearch(query);
  newsListView.renderNext();
};

newsListView.onLoadMore = async () => await searchNewsController.searchNext();

newsListView.renderer = (data, el) => new NewsCardComponent(data, el);
newsListView.totalNews = () => searchNewsController.totalResults;
newsListView.renderNext();