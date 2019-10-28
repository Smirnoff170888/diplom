/**
 * @module {NewsApi} NewsApi
 */

import Api from './Api.js';
import Utils from '../../../modules/helpers/Utils.js';

/**
 * Коннектор API для newsapi.org
 * @extends Api
 */
export default class NewsApi extends Api {
    /**
     * @param {String} token Токен доступа для запросов на newsapi.org
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