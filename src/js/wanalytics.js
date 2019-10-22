import AnalyticsView from './classes/Views/AnalyticsView.js';
import StorageController from './classes/Controllers/StorageController.js';

const storageController = new StorageController();
const analyticsView = new AnalyticsView(storageController.getData(), {
    query: '#queryText',
    total: '#findTotal',
    headers: '#findHeaders',
    days: '.tabel__col',
    bars: '.tabel__row',
    ranges: '.tabel__range'
});
analyticsView.render();