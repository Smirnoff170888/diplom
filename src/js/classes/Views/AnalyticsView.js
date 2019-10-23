import Info from '../../../blocks/info/Info.js';
import Tabel from '../../../blocks/tabel/Tabel.js';

export default class AnalyticsView {
    constructor(data, elems) {
        this._tabel = new Tabel(elems.tabel, data);
        this._info = new Info(elems.info, data);
    }

    render() {
        this._info.render();
        this._tabel.render();
    }
}