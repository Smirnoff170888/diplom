/**
 * @module {Slider} Slider
 */
import FixedComponent from '../../modules/FixedComponent.js';
import Utils from '../../modules/helpers/Utils.js';
import Card from './__card/Card';
import Swiper from 'swiper';

/**
 * Слайдер, отображающий карточки с коммитами
 * @extends FixedComponent
 */
export default class Slider extends FixedComponent {
    /**
     * @param {String|NodeElement} elem Селектор DOM-элемента, служащего базой для компонента
     * @param {Object} data Данные, необходимые компоненту
     */
    constructor(elem, data) {
        super(elem, data);
        this._el.slides = Utils.nodeElements('.slider__slides', this._container);
        /**
         * @member {Array} _cards Массив из карточек коммитов
         * @private
         */
        this._cards = this._data.map((commitData) => new Card(commitData, this._el.slides));
    }

    /**
     * Рендерит слайдер
     * @public
     */
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
            },
            on: {
                touchStart: () => {
                    this._container.classList.remove('slider_grab');
                    this._container.classList.add('slider_grabbing');
                },
                touchEnd: () => {
                    this._container.classList.remove('slider_grabbing');
                    this._container.classList.add('slider_grab');
                }
            }
        });
    }
}