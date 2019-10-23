import Api from './Api.js';
import Utils from '../../../modules/helpers/Utils.js';

export default class NewsApi extends Api {
    constructor(token) {
        super(config.api.news.url, { 'Authorization' : config.api.news.token });
    }

    async searchNews(data, cb) {
        let rdata = await this._query(`everything${Utils.formatObjToURLParams(data)}`, 'GET');
        if (cb && rdata) cb(rdata);
        return rdata;
    }
}