import clearLibrary from '../templates/clear-library.hbs';
const galleryLib = document.querySelector('.content'); //-
const wrapperFilms = document.querySelector('.wrapper-films');//+
const backHome = document.querySelector('.clear-library_btn');

function refreshPage() {
  document.location.reload();
}

export function clearLib() {
  // galleryLib.innerHTML = ''; //-
  // galleryLib.insertAdjacentHTML('beforeend', clearLibrary()); //-
  wrapperFilms.insertAdjacentHTML('beforeend', clearLibrary());
//   setTimeout(() => {
//   const backHome = document.querySelector('.clear-library_btn');
//    backHome.addEventListener('click', refreshPage);
// }, 1000); //*?
}

 
// clearLib()
