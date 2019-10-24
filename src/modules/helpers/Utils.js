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
    let paramsPartURI = '';
    for (let objKey in obj) {
        paramsPartURI += paramsPartURI ? '&' : '?';
        paramsPartURI += `${objKey}=${(obj[objKey])}`;
    }
    return paramsPartURI;
}

function nodeElements(processingData, parent = document) {
    const nodeElems = {};
    if (typeof(processingData) == 'string') {
        const nodes = parent.querySelectorAll(processingData);
        return (nodes.length && nodes.length == 1) ? nodes[0] : nodes;
    }
       
    if (typeof(processingData) === 'object' && processingData.nodeType)
        return processingData;
        
    for (let objKey in processingData) {
        if (typeof(processingData[objKey]) === 'string') {
            const nodes = parent.querySelectorAll(processingData[objKey]);
            nodeElems[objKey] = (nodes.length && nodes.length == 1) ? nodes[0] : nodes;
        } else if (typeof(processingData[k]) === 'object' && !processingData[objKey].nodeType)
            nodeElems[objKey] = nodeElements(processingData[objKey], parent);
        else
            nodeElems[objKey] = processingData[objKey];
    }
    return nodeElems;
}

export default {
    formatDate: formatDate,
    formateDateWeek: formatDateWeek,
    roundDay: roundDay,
    formatObjToURLParams: formatObjToURLParams,
    nodeElements: nodeElements
};