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

const strWeekdays = [
    'вс',
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'сб'];


function formatDate(strDate) {
    const date = new Date(strDate);
    const year = date.getFullYear();
    const month = strMonths[date.getMonth()];
    const day = date.getDate();
    return `${day} ${month}, ${year}`;
}

function formatDateWeek(iDate) {
    const date = new Date(iDate);
    const day = date.getDate();
    const weekday = strWeekdays[date.getDay()];
    return `${day}, ${weekday}`;
}

function roundDay(iDate) {
    const date = new Date(iDate);
    date.setHours(0, 0, 0, 0);
    return date;
}

function formatObjToURLParams(obj) {
    let ret = '';
    for (let k in obj) {
        ret += ret ? '&' : '?';
        ret += `${k}=${(obj[k])}`;
    }
    return ret;
}

function nodeElements(obj) {
    const ret = {};
    for (let k in obj) {
        if (typeof(obj[k]) === 'string') {
            const nodes = document.querySelectorAll(obj[k]);
            ret[k] = (nodes.length && nodes.length == 1) ? nodes[0] : nodes;
        } else if (typeof(obj[k]) === 'object' && !obj[k].nodeType)
            ret[k] = nodeElements(obj[k]);
        else
            ret[k] = obj[k];
    }
    return ret;
}

export default {
    formatDate: formatDate,
    formateDateWeek: formatDateWeek,
    roundDay: roundDay,
    formatObjToURLParams: formatObjToURLParams,
    nodeElements: nodeElements
};