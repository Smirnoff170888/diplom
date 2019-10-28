/**
 * @module
 */

/* Базовый класс API, осуществляющий ajax-запросы */
export default class Api {
    /**
     * Базовый класс API, осуществляющий ajax-запросы
     * @param {String} baseUrl базовый URL, от которого будут расти отностиельные пути запросов
     * @param {Object} headers заголовки запросов
     * @class
     */
    constructor(baseUrl, headers) {
        /**
         * @member _baseUrl {String} Базовый url
         * @private
         */
        this._baseUrl = baseUrl;
        /**
         * @member _headers {Object} заголовки
         * @private
         */
        this._headers = headers;
    }

    /**
     * Вызывается в случаи возникновения ошибки AJAX-запроса
     * @param {Function} cb Функция, которая будет зарегистрированая как коллбек
     * @event
     * @public
     */
    set onError(cb) {
        this._onError = cb;
    }

    /**
     * Обработчик ошибки, проверяет, если зарегестрирован onError cb, то вызывает его, иначе пишет ошибку в консоль
     * @param {String} text Текст ошибки 
     * @param {Object} obj Объект с ошибкой
     * @private
     */
    _error(text, obj) {
        if (this._onError)
            this._onError(text);
        else
            console.log(text, obj);
    }

    /**
     * Осуществляет ajax-запрос на удаленный сервер
     * @param {String} path Относительный путь запроса
     * @param {String} method HTTP Метод, по которому осуществляется запрос
     * @param {Object} data Данные, которые следует передать в теле запроса
     * @returns {Promise} Полученные данные 
     * @private
     */
    async _query(path, method, data) {
        const url = `${this._baseUrl}/${path}`;
        const options = {
            method: method,
            headers: this._headers,
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                this.error(`При запросе ${url}, сервер вернул ошибку: ${response.status}`, response);
                return null;
            }
            return await response.json();
        } catch (error) {
            this._error(`Произошла ошибка запроса к серверу по адресу: ${url}`, error);
            return null;
        }
    }
}