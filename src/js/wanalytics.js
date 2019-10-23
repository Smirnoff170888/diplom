import AnalyticsView from './classes/Views/AnalyticsView.js';
import StorageController from './classes/Controllers/StorageController.js';

const storageController = new StorageController();
const analyticsView = new AnalyticsView(storageController.getData(), {
    info: '.info',
    tabel: '.tabel'
});
analyticsView.render();