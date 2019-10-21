export default class ErrorView {
    constructor(data/*, container*/) {
        this._data = data;
        this._elem = this.createDom();
        this._container = document.querySelector('.error'); //hardcode is better in this situatuon
        this.render();
        setTimeout(() => this.destroy(), 5000);
    }

    createDom() {
        const elem = document.createElement('span');
        elem.classList = 'error__err';
        elem.textContent = this._data.text;
        return elem;
    }

    render() {
        this._container.appendChild(this._elem);
    }

    destroy() {
        this._elem.remove();
    }
}