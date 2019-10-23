export default class StorageController {
    constructor() {
        this._storId = sessionStorage.getItem('id')
        if (!this._storId)
            sessionStorage.setItem('id', this._generateId());
        this._cache = this._loadCache();
        if (!this._cache) this.initCache();
    }

    _generateId() {
        this._storId = 'ts' + Date.now();
        return this._storId;
    }

    _loadCache() {
        let cacheData = localStorage.getItem(this._storId);
        if (!cacheData) {
            cacheData = localStorage.getItem(localStorage.getItem('lastId'));
        }
        return JSON.parse(cacheData);
    }

    initCache() {
        this._cache = {
            params: {},
            data: [],
            updated: Date.now()
        };
    }

    saveData(data, params) {
        this._cache.data.push(data);
        this._cache.params = params;
        this._cache.updated = Date.now();
        localStorage.setItem(this._storId, JSON.stringify(this._cache));
        localStorage.setItem('lastId', this._storId);
    }

    getData() {
        return this._cache;
    }
}