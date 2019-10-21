import Utils from '../helpers/Utils.js';

export default class CommitView {
    constructor(data, container) {
        this._data = data;
        this._elem = this.createDom();
        this._container = container;
        this.render();
    }

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

    render() {
        this._container.appendChild(this._elem);
    }
}