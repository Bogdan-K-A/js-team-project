import genresData from './data/genresData.json';
const refs = {
  wrapperFilms: document.querySelector('.wrapper-films'),
  closeBtn: document.querySelector('.modal__button_close'),
  modalBackdrop: document.querySelector('.modal_backdrop'),
  galleryBox: document.querySelector('.modal-markup'),
  libraryPage: document.querySelector('.site-nav__link-library'),
};
// import refs from './refs';
const { wrapperFilms, galleryBox, modalBackdrop, closeBtn, libraryPage } = refs;

import {
  addToLocalStorWatched,
  addToLocalStorQueue,
  renderBtnWatch,
  renderBtnQueue,
} from './addToLocalStorLibrary.js';
import { onCutDate, onToggleGenresData } from './components/newData';
import modalMarkup from '../templates/modal.hbs';
import API from './apiService';

import { getLibrary, onBtnWatchedClick, onBtnQueueClick } from './linkMyLibrary'; //*

const fetchData = new API();

wrapperFilms.addEventListener('click', open);

export function open(e) {
  console.log(e.target);
  const cardId = e.target.parentNode.id;

  if (e.target.nodeName === 'IMG' && e.target.className === 'card-film__img') {
    modalBackdrop.classList.remove('is-hidden');
    renderModal(cardId);
    closeModal();
    modalBackdrop.addEventListener(
      'wheel',
      e => {
        // console.log('scroll');
        e.preventDefault();
      },
      { passive: false },
    );
  }
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
    const btnWatched = document.querySelector('.js-btn-watched'); //*
    const btnQueue = document.querySelector('.js-btn-queue'); //*
    if (btnWatched.classList.contains('isActive')) {
      onBtnWatchedClick();
    } else if (btnQueue.classList.contains('isActive')) {
      onBtnQueueClick();
    } else {
      getLibrary();
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
    localStorage.setItem('currentFilm', JSON.stringify(data));
    const markup = modalMarkup(data);

    // console.log(markup);

    galleryBox.insertAdjacentHTML('beforeend', markup);
    renderBtnWatch();
    renderBtnQueue();
    addToLocalStorQueue();
    addToLocalStorWatched();
  } catch (err) {
    console.log('error');
  }
}
