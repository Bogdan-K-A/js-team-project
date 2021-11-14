import genresData from './data/genresData.json';
const galleryPosterSetModal = document.querySelector('.wrapper-films');
const closeBtn = document.querySelector('.modal__button_close');
const modalBackdrop = document.querySelector('.modal_backdrop');
const galleryBox = document.querySelector('.modal-markup');
import { addToLocalStorWatched,addToLocalStorQueue,renderBtnWatch,renderBtnQueue } from './addToLocalStorLibrary.js';
import { onCutDate, onToggleGenresData } from './components/newData';
import modalMarkup from '../templates/modal.hbs';
import API from './apiService';

import { getLibrary } from './linkMyLibrary'; //*
import { onBtnWatchedClick, onBtnQueueClick } from './btnWatched-Queue.js';//*
const libraryPage = document.querySelector('.site-nav__link-library');//*


const fetchData = new API();

galleryPosterSetModal.addEventListener('click', open);

export function open(e) {
  // console.log(e.target);
  const cardId = e.target.parentNode.id;
  // console.log(e.target.parentNode.classList);
  if (!e.target.parentNode.classList.contains('modal')) {
    return;
  }
  modalBackdrop.classList.remove('is-hidden');
  renderModal(cardId)
  closeModal();
}
function closeModal() {
  closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      close();
    }
  });
  modalBackdrop.addEventListener('click', e => {
    if (e.target.classList.contains('modal_backdrop')) {
      close();
    }
  });
}

function close() {
  modalBackdrop.classList.add('is-hidden');
  galleryBox.innerHTML = '';
  // Видаляє обєкт з фільмом на LocalStorage
  localStorage.removeItem('currentFilm');
  if (libraryPage.classList.contains('link__current')) {
    const btnWatched = document.querySelector('.js-btn-watched');//*
    const btnQueue = document.querySelector('.js-btn-queue');//*
    if (btnWatched.classList.contains('isActive')) {
      onBtnWatchedClick()
    }
    else if (btnQueue.classList.contains('isActive')) {
      onBtnQueueClick()
    }
    else {
      getLibrary()
    }
  }
  
}

async function renderModal(cardId) {
  try {
    const data = await fetchData.getDescriptionMovie(cardId);
    // onCutDate(data);
    onToggleGenresData(data, genresData);
    // console.log(data);
    // Добавляє обєкт з фільмом на LocalStorage
    localStorage.setItem('currentFilm',JSON.stringify(data))
    const markup = modalMarkup(data);
    // console.log(markup);
    galleryBox.insertAdjacentHTML('beforeend', markup);
    renderBtnWatch()
    renderBtnQueue()
    addToLocalStorQueue()
    addToLocalStorWatched()
  } catch (err) {
    console.log('error');
  }
}


