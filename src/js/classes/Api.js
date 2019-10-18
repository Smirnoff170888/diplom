export default class Api {
    constructor(baseUrl, headers) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    async _query(path, method, data) {
        const url = `${this._baseUrl}/${path}`;
        const options = {
            method: method,
            headers: this._headers,
            body: JSON.stringify(data)
        }

        try {
            let response = await fetch(url, options);
            if (!response.ok) {
                console.log(`AJAX error, url: ${url}, status: ${response.status}`, response);
                return null;
            }
            return await response.json();
        } catch (error) {
            console.log(`AJAX general error, url: ${url}`, error);
            return null;
        }
    }
}