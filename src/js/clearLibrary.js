import clearLibrary from '../templates/clear-library.hbs';
import refs from './refs.js';
const { wrapperFilms, btnWatched, btnQueue } = refs;

function refreshPage() {
  btnWatched.removeEventListener('click', onBtnWatchedClick); //*
  btnQueue.removeEventListener('click', onBtnQueueClick); //*

  document.location.reload();
}

export function clearLib(text) {
  wrapperFilms.insertAdjacentHTML('beforeend', clearLibrary(text));
  setTimeout(() => {
    const backHome = document.querySelector('.clear-library_btn');
    // backHome.addEventListener('click', refreshPage);
  }, 1000);
}
