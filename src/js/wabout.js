import GhApi from './classes/Api/GhApi.js';
import Slider from '../blocks/slider/Slider.js';


const api = new GhApi(config.api.github);
api.getCommits(commits => new Slider('.slider', commits).render());
