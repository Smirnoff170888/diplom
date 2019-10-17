import NewsApi from './classes/NewsApi.js';
import NewsView from './classes/NewsView.js';

const newsAPi = new NewsApi('94ad67b6000f42d886d0825e6b9cd7c0');
const newsContainer = document.querySelector('.news-cards__item')

newsAPi.searchNews('navalny', async (data) => data.articles.forEach(element => new NewsView(element, newsContainer)));