import GhApi from './classes/Api/GhApi.js';
import Slider from '../blocks/slider/Slider.js';


const api = new GhApi({user: 'smirnoff170888', repo: 'diplom'});
api.getCommits(commits => new Slider('.slider', commits).render());
