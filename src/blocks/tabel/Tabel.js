import FixedComponent from '../../modules/FixedComponent.js';
import Utils from '../../modules/helpers/Utils.js';

export default class Tabel extends FixedComponent {
    constructor(elem, data) {
        super(elem, data);
        this._el.days = Utils.nodeElements('.tabel__col', this._container);
        this._el.bars = Utils.nodeElements('.tabel__row', this._container);
        this._el.ranges = Utils.nodeElements('.tabel__range', this._container);

        this._byDay = {};
        const curDate = Utils.roundDay(this._data.params.from);
        for (let i = 0; i < 7; i++) {
            this._byDay[curDate.getTime() + i*1000*60*60*24] = 0;
        }
        this._calculate();
    }

    _calculate() {
        this._maxInDay = 0;
        for (let i in this._data.data) {
            const date = Utils.roundDay(Date.parse(this._data.data[i].publishedAt));
            if (typeof(this._byDay[date.getTime()]) == 'undefined') //anormal situation, all questions to newsapi owner
                this._byDay[date.getTime()] = 0;
            this._byDay[date.getTime()]++;
            this._maxInDay = (this._byDay[date.getTime()] > this._maxInDay) ? this._byDay[date.getTime()] : this._maxInDay;
        }
    }

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

        for (let i in this._byDay) {
            const colEl = document.createElement('p');
            colEl.classList = 'tabel__day';
            colEl.textContent = Utils.formateDateWeek(Number(i));
            this._el.days.append(colEl);

            const barEl = document.createElement('p');
            barEl.classList = 'tabel__set';
            barEl.style.width = `${this._byDay[i] / this._maxInDay * 100}%`;
            this._el.bars.append(barEl);
        }
    }
}