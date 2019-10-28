/**
 * @module {StorageController} StorageController
 */

 /**
 * Контроллер доступа к кешированным данным.
 * Данный механизм позволяет иметь свой собственный кеш для каждой отдельный вкладки за счет хранения _storId в sessionStorage.
 * А также хранить и получать данные из localStorage.
  */
export default class StorageController {
    constructor() {
        /**
         * @member _storId {String} Идентификатор кеша, строка, составленная как 'ts' + timestamp времени инициализации
         * @private
         */
        this._storId = sessionStorage.getItem('id');
        if (!this._storId)
            sessionStorage.setItem('id', this._generateId());
        /**
         * @member _cache {Object} Данные, синхронизируемые с localStorage
         * @private
         */
        this._cache = this._loadCache();
        if (!this._cache) this.initCache();
    }

    /**
     * Генерирует новый cache id, по которому будут храниться данные в storage
     * @private
     * @returns {String} сгенерированный id, используемый как ключ при кешировании
     */
    _generateId() {
        this._storId = 'ts' + Date.now();
        return this._storId;
    }

    /**
     * Загружает данные из localStorage по cache id
     * @private
     * @returns {Object} Объект, полученный из localStorage
     */
    _loadCache() {
        let cacheData = localStorage.getItem(this._storId);
        if (!cacheData) {
            cacheData = localStorage.getItem(localStorage.getItem('lastId'));
        }
        return JSON.parse(cacheData);
    }

    /**
     * Создает внутреннюю структуру, на основе которой будут заполняться данные для кеширования.
     * Используется при первичной инициализации или сбросе кеша.
     * @public
     */
    initCache() {
        this._cache = {
            params: {},
            data: [],
            updated: Date.now()
        };
    }

    /**
     * Записывает объект в кеш
     * @param {Object} data Новость
     * @param {Object} params Параметры поиска
     * @public
     */
    saveData(data, params) {
        this._cache.data.push(data);
        this._cache.params = params;
        this._cache.updated = Date.now();
        localStorage.setItem(this._storId, JSON.stringify(this._cache));
        localStorage.setItem('lastId', this._storId);
    }

    /**
     * Возвращает кешированный результат
     * @returns {Object} Данные из кеша
     * @public
     */
    getData() {
        return this._cache;
    }
}