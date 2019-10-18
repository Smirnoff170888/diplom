import GhApi from './classes/GhApi.js';
import CommitView from './classes/CommitView.js';

const api = new GhApi({user: 'smirnoff170888', repo: 'diplom'});
const commitContainer = document.querySelector('.slider__slides');
api.getCommits(data => data.forEach(element => new CommitView(element, commitContainer)));