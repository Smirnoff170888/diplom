/**
 * @module {Tabel} Tabel
 */
import FixedComponent from '../../modules/FixedComponent.js';
import Utils from '../../modules/helpers/Utils.js';
import Consts from '../../modules/helpers/Consts.js';

/**
 * Компонент для отображения блока столбчатой диаграммы
 * @extends FixedComponent
 */
export default class Tabel extends FixedComponent {
    /**
     * @param {String|NodeElement} elem Селектор DOM-элемента, служащего базой для компонента
     * @param {Object} data Данные о найденных новостях
     */
    constructor(elem, data) {
        super(elem, data);
        this._el.days = Utils.nodeElements('.tabel__col', this._container);
        this._el.bars = Utils.nodeElements('.tabel__row', this._container);
        this._el.ranges = Utils.nodeElements('.tabel__range', this._container);
        this._el.monthName = Utils.nodeElements('#month_start', this._container);

        /**
         * @member {Object} _byDay Объект, содержащий количество новостей в разрезе одного дня
         * @private
         */
        this._byDay = {};
        const curDate = Utils.roundDay(this._data.params.from);
        for (let i = 0; i < 7; i++) {
            this._byDay[curDate.getTime() + (i * Consts.dates.oneDayInMs)] = 0;
        }
        this._calculate();
    }

    /**
     * Вычисление данных об упоминаниях
     * @private
     */
    _calculate() {
        /**
         * @member {Number} _maxInDay максимальное количество новостей за один день
         * @private
         */
        this._maxInDay = 0;
        for (let i in this._data.data) {
            const date = Utils.roundDay(Date.parse(this._data.data[i].publishedAt));
            if (typeof(this._byDay[date.getTime()]) == 'undefined') //anormal situation, all questions to newsapi owner
                this._byDay[date.getTime()] = 0;
            this._byDay[date.getTime()]++;
            this._maxInDay = (this._byDay[date.getTime()] > this._maxInDay) ? this._byDay[date.getTime()] : this._maxInDay;
        }
    }

    /**
     * Функция рендеринга компонента
     * @public
     */
    render() {
        this._el.ranges.forEach((scale) => {
            const genScale = (percent) => {
                const scaleEl = document.createElement('p');
                scaleEl.classList = 'tabel__number';
                scaleEl.textContent = Math.round(this._maxInDay * percent);
                return scaleEl;
            };
            scale.append(genScale(0));
            scale.append(genScale(0.25));
            scale.append(genScale(0.5));
            scale.append(genScale(0.75));
            scale.append(genScale(1));
        });

        const genBar = (newsCount) => {
            const barEl = document.createElement('p');
            barEl.classList = 'tabel__set';
            barEl.style.width = `${newsCount / this._maxInDay * 100}%`;
            if (newsCount > 0) {
                const barNumber = document.createElement('span');
                barNumber.classList = 'tabel__count';
                barNumber.textContent = newsCount;
                barEl.appendChild(barNumber);
            }
            return barEl;
        }

        for (let i in this._byDay) {
            const colEl = document.createElement('p');
            colEl.classList = 'tabel__day';
            colEl.textContent = Utils.formateDateWeek(Number(i));
            this._el.days.append(colEl);

            this._el.bars.append(genBar(this._byDay[i]));
        }

        this._el.monthName.textContent = `(${Consts.dates.monthStr[(new Date(this._data.params.from)).getMonth()]})`;
    }
}