export default class AbstractComponent {
    constructor(data, container) {
        this._data = data;
        this._elem = this.createDom();
        this._container = container;
        this.render();
    }

    //abstract createDom() {}

    render() {
        this._container.appendChild(this._elem);
    }

    destroy() {
        this._elem.remove();
    }
}