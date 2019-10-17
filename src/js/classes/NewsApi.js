import Api from './Api.js'

export default class NewsApi extends Api {
    constructor(token) {
        super('https://newsapi.org/v2', { 'Authorization' : token });
    }

    async searchNews(strQuery, cb) {
        let rdata = await this._query(`everything?q=${strQuery}&pageSize=20`, 'GET');
        if (cb && rdata) cb(rdata);
        return rdata;
    }
}