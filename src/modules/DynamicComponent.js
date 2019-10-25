export default class DynamicComponent {
    constructor(data, container) {
        this._fData = data;
        this._fElem = this.createDom();
        this._fContainer = container;
    }

    get _data() { //protected
        return this._fData;
    }

    get _elem() { //protected
        return this._fElem;
    }

    get _container() { //protected
        return this._fContainer;
    }

    //abstract createDom() {}

    render() {
        this._container.appendChild(this._elem);
    }

    destroy() {
        this._elem.remove();
    }
}