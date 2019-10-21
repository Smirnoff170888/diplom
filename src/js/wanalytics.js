import AnalyticsController from './classes/Controllers/AnalyticsController.js';
import StorageController from './classes/Controllers/StorageController.js';

const storageController = new StorageController();
const analyticsController = new AnalyticsController(storageController.getData(), {
    query: '#queryText',
    total: '#findTotal',
    headers: '#findHeaders',
    days: '.tabel__col',
    bars: '.tabel__row',
    ranges: '.tabel__range'
});
analyticsController.render();