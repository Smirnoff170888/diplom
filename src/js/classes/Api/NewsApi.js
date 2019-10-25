import Api from './Api.js';
import Utils from '../../../modules/helpers/Utils.js';

export default class NewsApi extends Api {
    constructor(token) {
        super(config.api.news.url, { 'Authorization' : token });
    }

    async searchNews(params, cb) {
        const newsData = await this._query(`everything${Utils.formatObjToURLParams(params)}`, 'GET');
        if (cb && newsData) cb(newsData);
        return newsData;
    }
}