/**
 * @module {GhApi} GhApi
 */

import Api from './Api.js';

/**
 * Коннектор Api для GitHub
 * @extends Api
 */
export default class GhApi extends Api {
    /**
     * @param {Object} param0 Параметры API для GitHub
     */
    constructor ({user, repo}) {
        super(config.api.github.url, {'Content-Type': 'application/json'});
        /**
         * @member _user {String} Имя пользователя Github
         * @private
         */
        this._user = user;
        /**
         * @member _repo {String} Имя репозиторий
         * @private
         */
        this._repo = repo;
    }

    /**
     * Функция запроса коммитов
     * @param {?Function} cb Коллбек, в который будут возвращен результат выполнения запроса
     * @returns {Promise} Результат запрос коммитов
     * @public
     */
    async getCommits(cb) {
        const commitsData = await this._query(`repos/${this._user}/${this._repo}/commits`, 'GET');
        if (cb && commitsData) cb(commitsData);
        return commitsData;
    }
}