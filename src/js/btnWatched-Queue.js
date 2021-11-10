import { load } from './linkMyLibrary.js' //Local Storage
import { updateDate, updateRating, updateGenres } from './getCards';

import renderTamplLibrary from './library-container.js';
const refs = {
    wrapperFilms: document.querySelector('.wrapper-films')
};

export function onBtnWatchedClick() {
    clearMainContainer();
    const btnWatched = document.querySelector('.js-btn-watched');
    const btnQueue = document.querySelector('.js-btn-queue');
    btnWatched.classList.add("isActive");
    btnQueue.classList.remove("isActive");

    let filmWatched = load('watched');
    
    if (filmWatched !== undefined) {
        updateDate(filmWatched);
        updateGenres(filmWatched);
        updateRating(filmWatched);
        
        renderTamplLibrary(filmWatched.results);
    }
    else {
        let markup = `<p>No movies watched</p>`
        return refs.wrapperFilms.insertAdjacentHTML('beforeend', markup)
    }
    
}

export function onBtnQueueClick() {
    clearMainContainer();
    const btnWatched = document.querySelector('.js-btn-watched');
    const btnQueue = document.querySelector('.js-btn-queue');
    btnWatched.classList.remove("isActive");
    btnQueue.classList.add("isActive");
    let filmQueue = load('queue');
    
    if (filmQueue !== undefined) {
        updateDate(filmQueue);
        updateGenres(filmQueue);
        updateRating(filmQueue);
        
        renderTamplLibrary(filmQueue.results);
    }
    else {
        let markup = `<p>No movies added</p>`
        return refs.wrapperFilms.insertAdjacentHTML('beforeend', markup)
    }
    
}

function clearMainContainer() {
  refs.wrapperFilms.innerHTML = '';
}


