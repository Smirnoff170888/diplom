import Api from './Api.js';

export default class GhApi extends Api {
    constructor ({user, repo}) {
        super('https://api.github.com', {'Content-Type': 'application/json'});
        this._user = user;
        this._repo = repo;
    }

    async getCommits(cb) {
        let rdata = await this._query(`repos/${this._user}/${this._repo}/commits`, 'GET');
        if (cb && rdata) cb(rdata);
        return rdata;
    }
}