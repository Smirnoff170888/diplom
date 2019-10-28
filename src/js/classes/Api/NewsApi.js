/**
 * @module
 */

import Api from './Api.js';
import Utils from '../../../modules/helpers/Utils.js';


export default class NewsApi extends Api {
    /**
     * Коннектор API для newsapi.org
     * @param {String} token Токен доступа для запросов на newsapi.org
     * @class
     * @extends Api
     */
    constructor(token) {
        super(config.api.news.url, { 'Authorization' : token });
    }

    /**
     * Запрос новостей по заданным параметрам
     * @param {Object} params Параметры запроса
     * @param {?Function} cb Коллбек, в который будут возвращен результат выполнения запроса
     */
    async searchNews(params, cb) {
        const newsData = await this._query(`everything${Utils.formatObjToURLParams(params)}`, 'GET');
        if (cb && newsData) cb(newsData);
        return newsData;
    }
}