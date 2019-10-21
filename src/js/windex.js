import NewsApi from './classes/Api/NewsApi.js';
import NewsCardComponent from './classes/Components/NewsCardComponent.js';
import NewsController from './classes/Controllers/NewsController.js';
import StorageController from './classes/Controllers/StorageController.js';

const elNewsContainer = document.querySelector('.news-cards__item');

const newsAPI = new NewsApi('94ad67b6000f42d886d0825e6b9cd7c0');
const storageController = new StorageController();
const cachedData = storageController.getData();
let newsParams = cachedData.params;
if (!newsParams) newsParams = { newsPerPage: 20 };

const newsController = new NewsController({
        searchForm: '.search__search-field',
        nextForm: '.news-cards__form',
        preloadContainer: '.news-cards__search',
        notFound: '.news-cards__not-found'
        }, newsParams, newsAPI);

newsController.onNewsFound = (news, params) => {
  storageController.saveData(news, params);
  return new NewsCardComponent(news, elNewsContainer);
};

newsController.onResetSearch = () => {
  storageController.initCache();
};

if (cachedData.data)
  for (let i in cachedData.data) {
    newsController.addManual(new NewsCardComponent(cachedData.data[i], elNewsContainer));
  }
newsController.redraw();