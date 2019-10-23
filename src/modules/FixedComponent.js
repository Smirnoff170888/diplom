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
        if (this._container.style.display != 'none')
            this._container.style.display = 'none';
    }

    show() {
        const displayType = (this._displayType) ? this._displayType : 'block';
        if (this._container.style.display != displayType)
            this._container.style.display = displayType;
    }

    //abstract render()
}