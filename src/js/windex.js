import NewsApi from './classes/NewsApi.js';
import NewsView from './classes/NewsView.js';
import NewsController from './classes/NewsController.js';

const newsAPI = new NewsApi('94ad67b6000f42d886d0825e6b9cd7c0');
const elNewsContainer = document.querySelector('.news-cards__item');
const elSearchForm = document.querySelector('.search__search-field');
const elNextForm = document.querySelector('.news-cards__form');
const elPreloadContainer = document.querySelector('.news-cards__search');

const newsController = new NewsController({
    search: elSearchForm,
    next: elNextForm,
    preloader: elPreloadContainer
}, newsAPI);

newsController.onNewsFound = (news) => {
    return new NewsView(news, elNewsContainer);
}