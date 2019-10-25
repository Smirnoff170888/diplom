import AnalyticsView from './classes/Views/AnalyticsView.js';
import StorageController from './classes/Controllers/StorageController.js';
import Error from '../blocks/error/Error.js';

const storageController = new StorageController();
const analyticsView = new AnalyticsView(storageController.getData(), {
    info: '.info',
    tabel: '.tabel'
});
const errorHandler = new Error('.error');

analyticsView.onError = (text) => errorHandler.add(text);
analyticsView.render();