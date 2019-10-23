import FixedComponent from '../../modules/FixedComponent.js';
import Utils from '../../modules/helpers/Utils.js';
import Card from './__card/Card';
import Swiper from 'swiper';

export default class Slider extends FixedComponent {
    constructor(elem, data) {
        super(elem, data);
        this._el.slides = Utils.nodeElements('.slider__slides', this._container);
        this._cards = this._data.map((commitData) => new Card(commitData, this._el.slides));
    }

    render() {
        this._cards.forEach((card) => card.render());
        new Swiper(this._container, {
            loop: true,
            freeMode: true,
            slidesPerView: 'auto',
            navigation: {
                nextEl: '.slider__arrow_right',
                prevEl: '.slider__arrow_left'    
            },
            pagination: {
                el: '.slider__bullets',
                clickable: true,
                bulletClass: 'slider__bullet',
                bulletActiveClass: 'slider__bullet-active',
            }
        });
    }
}