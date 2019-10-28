/**
 * Модуль-хелпер, в котором хранятся всякие разные функции
 * @module Utils
 */

/**
 * @constant {Array} strMonths Названия месяцев на русском языке в родительный падеже
 */
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

/**
 * @constant {Array} strWeekdays Сокращенные названия дней недели на русском языке
 */
const strWeekdays = [
    'вс',
    'пн',
    'вт',
    'ср',
    'чт',
    'пт',
    'сб'];


/**
 * Преобразует дату в формат вида 12 янвяря 2019
 * @param {String} strDate Дата в строковом формате
 * @returns {String} Дата в нужном формате
 */
function formatDate(strDate) {
    const date = new Date(strDate);
    const year = date.getFullYear();
    const month = strMonths[date.getMonth()];
    const day = date.getDate();
    return `${day} ${month}, ${year}`;
}

/**
 * Преобразует дату в формат вида - 12, пн
 * @param {Number} iDate timestamp
 * @returns {String} Дата в нужном формате
 */
function formatDateWeek(iDate) {
    const date = new Date(iDate);
    const day = date.getDate();
    const weekday = strWeekdays[date.getDay()];
    return `${day}, ${weekday}`;
}

/**
 * Округляет дату до начала дня
 * @param {Number} iDate timestamp
 * @returns {Date} Дата в нужном формате
 */
function roundDay(iDate) {
    const date = new Date(iDate);
    date.setHours(0, 0, 0, 0);
    return date;
}

/**
 * Преобразует объект с параметрами ({param1: value, p2=v2}) в URI-params подстроку (?param1=value&p2=v2)
 * @param {Object} obj Объект с параметрами
 * @returns {String} Строка с URL-параметрами
 */
function formatObjToURLParams(obj) {
    let paramsPartURI = '';
    for (let objKey in obj) {
        paramsPartURI += paramsPartURI ? '&' : '?';
        paramsPartURI += `${objKey}=${(obj[objKey])}`;
    }
    return paramsPartURI;
}

/**
 * Превращает входящий селектор (объект с селекторами) в 
 * @param {Object|String|NodeElement} processingData Объект/строка/NodeElement с селекторами
 * @param {?NodeElement} parent Родитель, от которого ищутся селекторы
 * @returns {Object|NodeElement} Объект с NodeElement (если на входе был Object) или NodeElement (в противном случае)
 */
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