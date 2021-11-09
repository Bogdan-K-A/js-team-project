import clearLibrary from '../templates/clear-library.hbs';
const galleryLib = document.querySelector('.content');
  const backHome = document.querySelector('.clear-library_btn');

function refreshPage() {
  document.location.reload();
}

function clearLib() {

galleryLib.innerHTML = '';
galleryLib.insertAdjacentHTML('beforeend', clearLibrary());

backHome.addEventListener('click', refreshPage);
}

