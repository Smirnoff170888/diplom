import Info from '../../../blocks/info/Info.js';
import Tabel from '../../../blocks/tabel/Tabel.js';

export default class AnalyticsView {
    constructor(data, elems) {
        this._data = data;
        this._tabel = new Tabel(elems.tabel, data);
        this._info = new Info(elems.info, data);
    }

    render() {
        if (this._data.params.q) {
            this._info.render();
            this._tabel.render();    
        } else {
            this._info.hide();
            this._tabel.hide()
        }
        this._onError('Ошибка загрузка кэша');
    }

    set onError(cb) {
        this._onError = cb;
    }
}