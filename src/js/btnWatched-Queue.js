import { load } from './linkMyLibrary.js' //Local Storage
import { updateLDate, updateLRating, updateLGenres } from './linkMyLibrary';

import renderTamplLibrary from './library-container.js';
const refs = {
    wrapperFilms: document.querySelector('.wrapper-films')
};

import { clearLib } from './clearLibrary'; 

export function onBtnWatchedClick() {
    clearMainContainer(); 
    const btnWatched = document.querySelector('.js-btn-watched');
    const btnQueue = document.querySelector('.js-btn-queue');
    btnWatched.classList.add("isActive");
    btnQueue.classList.remove("isActive");

    let filmWatched = load('watched');
    
    if (filmWatched.length !== 0) {
        updateLDate(filmWatched);
        updateLGenres(filmWatched);
        updateLRating(filmWatched);
        
        renderTamplLibrary(filmWatched);
    }
    
    else {
        const textLibrary = { text: 'No movies watched' };
        return clearLib(textLibrary)
    }
    
}

export function onBtnQueueClick() {
    clearMainContainer();
    const btnWatched = document.querySelector('.js-btn-watched');
    const btnQueue = document.querySelector('.js-btn-queue');
    btnWatched.classList.remove("isActive");
    btnQueue.classList.add("isActive");
    let filmQueue = load('queue');
    
    if (filmQueue.length !== 0) {
        updateLDate(filmQueue);
        updateLGenres(filmQueue);
        updateLRating(filmQueue);
        
        renderTamplLibrary(filmQueue);
    }
    
    else {
        const textLibrary = { text: 'No movies added' };
        return clearLib(textLibrary)
    }
    
}

function clearMainContainer() {
  refs.wrapperFilms.innerHTML = '';
}



