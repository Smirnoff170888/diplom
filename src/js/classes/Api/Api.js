export default class Api {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    set onError(cb) {
        this._onError = cb;
    }

    _error(text, obj) {
        if (this._onError)
            this._onError(text);
        else
            console.log(text, obj);
    }

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
                this.error(`AJAX error, url: ${url}, status: ${response.status}`, response);
                return null;
            }
            return await response.json();
        } catch (error) {
            this._error(`AJAX general error, url: ${url}`, error);
            return null;
        }
    }
}