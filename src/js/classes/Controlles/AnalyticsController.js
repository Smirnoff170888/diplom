import Utils from '../../helpers/Utils.js';

export default class AnalyticsController {
    constructor(data, elems) {
        this._data = data;
        this._byDay = {};
        this.el = elems;
        const curDate = Utils.roundDay(this._data.params.from);
        for (let i = 0; i < 7; i++) {
            this._byDay[curDate.getTime() + i*1000*60*60*24] = 0;
        }
        this._calculate();
    }

    _calculate() {
        this._totalResults = this._data.data.length;
        this._inHeaders = this._data.data.reduce((acc, news) => {
            return acc + new RegExp(`${this._data.params.q}`, 'i').test(news.title);
        }, 0)

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
        this.el.query.textContent = this._data.params.q;
        this.el.total.textContent = this._totalResults;
        this.el.headers.textContent = this._inHeaders;

        this.el.ranges.forEach((scale) => {
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
            this.el.days.append(colEl);

            const barEl = document.createElement('p');
            barEl.classList = 'tabel__set';
            barEl.style.width = `${this._byDay[i] / this._maxInDay * 100}%`;
            this.el.bars.append(barEl);
            console.log(colEl, barEl);
        }
    }
}