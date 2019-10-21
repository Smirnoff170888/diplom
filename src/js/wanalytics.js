import AnalyticsController from './classes/Controlles/AnalyticsController.js';
import StorageController from './classes/Controlles/StorageController.js';

const storageController = new StorageController();
const analyticsController = new AnalyticsController(storageController.getData(), {
    query: document.querySelector('#queryText'),
    total: document.querySelector('#findTotal'),
    headers: document.querySelector('#findHeaders'),
    days: document.querySelector('.tabel__col'),
    bars: document.querySelector('.tabel__row'),
    ranges: document.querySelectorAll('.tabel__range')
});
analyticsController.render();