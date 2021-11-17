import ApiService from './apiService';
import renderTrailer from '../templates/trailer.hbs';
import { open } from './modal';
const newsApiService = new ApiService();

const refs = {
  modal: document.querySelector('.modal_window'),
  videoContainer: document.querySelector('.modal_youTube-video-container'),
  youTubModal: document.querySelector('.modal_youTube'),
  videoCloseBtn: document.querySelector('.modal_youTube__close-btn'),
  backdrop: document.querySelector('.modal_backdrop'),
  closeBtn: document.querySelector('.youTube-close-btn'),
};
const { modal, videoContainer, youTubModal, videoCloseBtn, backdrop, closeBtn } = refs;

modal.addEventListener('click', onModalBtnClick);
videoCloseBtn.addEventListener('click', clearVideoModal);

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
  backdrop.classList.add('is-hidden');
  videoContainer.innerHTML = '';

  videoContainer.classList.remove('watch');
  youTubModal.classList.add('is-hidden');
  videoCloseBtn.removeEventListener('click', onKeyClose);

  window.removeEventListener('keyup', onKeyClose);
}

function onKeyClose(e) {
  if (e.code === 'Escape') {
    videoContainer.innerHTML = '';
    onCloseBtn();
  }
}
function clearVideoModal() {
  videoContainer.innerHTML = '';
  videoContainer.classList.remove('watch');
  youTubModal.classList.add('is-hidden');
  videoCloseBtn.removeEventListener('click', onKeyClose);
}
