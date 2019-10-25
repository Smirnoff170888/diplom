import Utils from './helpers/Utils.js';

export default class FixedComponent {
    constructor(elem, data = {}, events = {}) {
        this._fContainer = Utils.nodeElements(elem);
        this._fData = data;
        this._fEvents = events;
        this._fEl = {};
        //Utils.makeContextFree(this);
    }

    get _container() { //protected
        return this._fContainer;
    }

    get _data() { //protected
        return this._fData;
    }

    get _events() { //protected
        return this._fEvents;
    }

    get _el() { //protected
        return this._fEl;
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