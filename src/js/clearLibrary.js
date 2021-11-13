import clearLibrary from '../templates/clear-library.hbs';
const wrapperFilms = document.querySelector('.wrapper-films');//*
const btnWatched = document.querySelector('.js-btn-watched'); //*
const btnQueue = document.querySelector('.js-btn-queue'); //*

function refreshPage() {
  btnWatched.removeEventListener('click', onBtnWatchedClick); //*
  btnQueue.removeEventListener('click', onBtnQueueClick); //*

  document.location.reload();
}

export function clearLib(text) {
  wrapperFilms.insertAdjacentHTML('beforeend', clearLibrary(text));
  setTimeout(() => {
  const backHome = document.querySelector('.clear-library_btn');
    backHome.addEventListener('click', refreshPage);
}, 1000); 
}

