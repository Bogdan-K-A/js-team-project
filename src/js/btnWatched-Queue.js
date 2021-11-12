import { load } from './linkMyLibrary.js' //Local Storage
import { updateLDate, updateLRating, updateLGenres } from './linkMyLibrary';

import renderTamplLibrary from './library-container.js';
const refs = {
    wrapperFilms: document.querySelector('.wrapper-films')
};

export function onBtnWatchedClick() {
    // clearMainContainer(); //*
    const btnWatched = document.querySelector('.js-btn-watched');
    const btnQueue = document.querySelector('.js-btn-queue');
    btnWatched.classList.add("isActive");
    btnQueue.classList.remove("isActive");

    let filmWatched = load('watched');
    
    if (filmWatched.length !== 0) {
        clearMainContainer();//*
        updateLDate(filmWatched);
        updateLGenres(filmWatched);
        updateLRating(filmWatched);
        
        renderTamplLibrary(filmWatched);
    }
    // else {
    //     console.log('No movies watched')
    //     let markup = `<p>No movies watched</p>`
    //     return refs.wrapperFilms.insertAdjacentHTML('beforeend', markup)
    //     return clearLib()
    // }
    
}

export function onBtnQueueClick() {
    // clearMainContainer();
    const btnWatched = document.querySelector('.js-btn-watched');
    const btnQueue = document.querySelector('.js-btn-queue');
    btnWatched.classList.remove("isActive");
    btnQueue.classList.add("isActive");
    let filmQueue = load('queue');
    
    if (filmQueue.length !== 0) {
        clearMainContainer();//*
        updateLDate(filmQueue);
        updateLGenres(filmQueue);
        updateLRating(filmQueue);
        
        renderTamplLibrary(filmQueue);
    }
    // else {
    //     console.log('No movies que')
    //     let markup = `<p>No movies added</p>`
    //     return refs.wrapperFilms.insertAdjacentHTML('beforeend', markup)
    // }
    
}

function clearMainContainer() {
  refs.wrapperFilms.innerHTML = '';
}



