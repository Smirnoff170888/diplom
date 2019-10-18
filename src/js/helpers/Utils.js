const strMonths = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'];

function formatDate(strDate) {
    const date = new Date(strDate);
    const year = date.getFullYear();
    const month = strMonths[date.getMonth()];
    const day = date.getDate();
    return `${day} ${month}, ${year}`;
}

function formatObjToURLParams(obj) {
    let ret = '';
    for (let k in obj) {
        ret += ret ? '&' : '?';
        ret += `${k}=${(obj[k])}`;
    }
    return ret;
}

export default {
    formatDate: formatDate,
    formatObjToURLParams: formatObjToURLParams
};