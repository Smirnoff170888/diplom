import Utils from './helpers/Utils.js';

export default class FixedComponent {
    constructor(elem, data = {}, events = {}) {
        this._container = Utils.nodeElements(elem);
        this._data = data;
        this._events = events;
        this._el = {};
        Utils.makeContextFree(this);
    }

    getContainer() {
        return this._container;
    }

    hide() {
        if (!this._container.classList.contains('hide'))
            this._container.classList.add('hide');
    }

    show() {
        if (this._container.classList.contains('hide'))
            this._container.classList.remove('hide');
    }

    //abstract render()
}