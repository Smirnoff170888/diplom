import Api from './Api.js';

export default class GhApi extends Api {
    constructor ({user, repo}) {
        super(config.api.github.url, {'Content-Type': 'application/json'});
        this._user = user;
        this._repo = repo;
    }

    async getCommits(cb) {
        const commitsData = await this._query(`repos/${this._user}/${this._repo}/commits`, 'GET');
        if (cb && commitsData) cb(commitsData);
        return commitsData;
    }
}