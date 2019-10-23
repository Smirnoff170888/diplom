import FixedComponent from '../../../modules/FixedComponent.js';
import Utils from '../../../modules/helpers/Utils.js'

export default class Container extends FixedComponent {
    constructor(elem) {
        super(elem);
        this._cards = [];
        this._displayType = 'flex';
        this._resContainer = Utils.nodeElements('.news-cards__item', this._container);
    }

    set cardRenderer(cb) {
        this._renderer = cb;
    }

    render(data) {
        this.show();
        const card = this._renderer(data, this._resContainer);
        this._cards.push(card);
        card.render();
    }

    clear() {
        if (this._cards) this._cards.forEach((card) => card.destroy());
        this._cards = [];
        this.hide();
    }
}