import GhApi from './classes/Api/GhApi.js';
import Slider from '../blocks/slider/Slider.js';
import Commits from '../blocks/commits/Commits.js';
import Error from '../blocks/error/Error.js';

const api = new GhApi(config.api.github);
const errorHandler = new Error('.error');
const commits = new Commits('.commits');

api.onError = (text) => {
    errorHandler.add(text);
    commits.hide();
};
api.getCommits(commits => new Slider('.slider', commits).render());
