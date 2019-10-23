export default class DynamicComponent {
    constructor(data, container) {
        this._data = data;
        this._elem = this.createDom();
        this._container = container;
    }

    //abstract createDom() {}

    render() {
        this._container.appendChild(this._elem);
    }

    destroy() {
        this._elem.remove();
    }
}