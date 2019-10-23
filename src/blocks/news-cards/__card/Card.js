import DynamicComponent from '../../../modules/DynamicComponent.js';
import Utils from '../../../modules/helpers/Utils.js';

export default class NewsCardComponent extends DynamicComponent {
    createDom() {
        const template = `
            <div class="news-cards__wrapper">
                <img src="${this._data.urlToImage}" alt="${this._data.title}" class="news-cards__image">
                <p class="news-cards__date">${Utils.formatDate(this._data.publishedAt)}</p>
                <h3 class="news-cards__news">${this._data.title}</h3>
                <p class="news-cards__paragraph">${this._data.content}</p>
            </div>
            <p class="news-cards__source">${this._data.source.name}</p>`;
        const elem = document.createElement('div');
        elem.classList = 'news-cards__card';
        elem.insertAdjacentHTML('beforeend', template);
        return elem;
    }
}