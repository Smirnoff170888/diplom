import GhApi from './classes/Api/GhApi.js';
import CommitCardComponent from './classes/Components/CommitCardComponent.js';
import Swiper from 'swiper';

document.addEventListener('DOMContentLoaded', async () => {
    const api = new GhApi({user: 'smirnoff170888', repo: 'diplom'});
    const commitContainer = document.querySelector('.slider__slides');
    await api.getCommits(data => data.forEach(element => new CommitCardComponent(element, commitContainer)));
    new Swiper('.slider', {
        loop: true,
        freeMode: true,
        slidesPerView: 'auto',
        navigation: {
            nextEl: '.slider__arrow_right',
            prevEl: '.slider__arrow_left'    
        },
        pagination: {
            el: '.slider__bullets',
            clickable: true,
            bulletClass: 'slider__bullet',
            bulletActiveClass: 'slider__bullet-active',
        }
    });
});
