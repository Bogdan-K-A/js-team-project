import ApiService from './apiService';
import renderTrailer from '../templates/trailer.hbs';
import { open } from './modal';
const newsApiService = new ApiService();

import refs from './refs';
const { modal, videoContainer, youTubModal, videoCloseBtn, modalBackdrop, closeBtn } = refs;

modal.addEventListener('click', onModalBtnClick);
videoCloseBtn.addEventListener('click', clearVideoModal);
modalBackdrop.addEventListener('click', onBackdrop);
document.addEventListener('keydown', onKeyClose);
function onModalBtnClick(e) {
  try {
    e.preventDefault();
    const id = JSON.parse(e.target.dataset.id);

    if (e.target.hasAttribute('data-trailer')) {
      if (videoContainer.classList.contains('watch')) return;
      newsApiService
        .getFetchTrailerSearch(id)
        .then(el => {
          return el.results.find(el => {
            const videoName = el.name.split(' ');
            return videoName.some(el => el === 'Trailer');
          });
        })
        .then(el => {
          videoContainer.insertAdjacentHTML('beforeend', renderTrailer(el));
          videoContainer.classList.add('watch');
          youTubModal.classList.remove('is-hidden');
        });
    }
  } catch {
    open(e);
  }
}
function onCloseBtn(e) {
  modalBackdrop.classList.add('is-hidden');
  videoContainer.innerHTML = '';
  videoContainer.classList.remove('watch');
  youTubModal.classList.add('is-hidden');
  videoCloseBtn.removeEventListener('keydown', onKeyClose);
}
function onBackdrop(e) {
  if (e.target.classList.contains('modal_backdrop')) {
    onCloseBtn();
  }
}
function onKeyClose(e) {
  if (e.code === 'Escape') {
    onCloseBtn();
    clearVideoModal();
  }
}
function clearVideoModal() {
  videoContainer.innerHTML = '';
  videoContainer.classList.remove('watch');
  youTubModal.classList.add('is-hidden');
  videoCloseBtn.removeEventListener('keydown', onKeyClose);
}
