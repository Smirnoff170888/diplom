/**
 * @module
 */
import DynamicComponent from '../../../modules/DynamicComponent.js';
import Utils from '../../../modules/helpers/Utils.js';

/**
 * Карточка для отрисовки коммита
 * @extends DynamicComponent
 * @param {Object} data Данные, необходимые компоненту
 * @param {NodeElement} container Родительский контейнер, в конец которого будет рендерится компонент
 */
export default class Card extends DynamicComponent {
    /**
     * Генерирует DOM-структуру компонента
     * @public
     */
    createDom() {
        const template = `
                <div class="slider__card">
                    <p class="slider__date">${Utils.formatDate(this._data.commit.committer.date)}</p>
                    <div class="slider__info">
                        <img src="${this._data.author.avatar_url}" alt="Аватар комментатора" class="slider__avatar">
                        <div class="slider__user">
                            <h3 class="slider__name">${this._data.commit.committer.name}</h3>
                            <p class="slider__email">${this._data.commit.committer.email}</p>
                        </div>
                    </div>
                    <p class="slider__text">${this._data.commit.message}</p>
                </div>`;
        const elem = document.createElement('li');
        elem.classList = 'slider__container swiper-slide';
        elem.insertAdjacentHTML('beforeend', template);
        return elem;
    }
}