import myFilter from '../templates/header-library.hbs';
import { getLibrary } from './linkMyLibrary'; //*
import refs from './refs';
const { libraryPage, headerHome, pageHome, searchQuery } = refs;

function addLibraryPage(e) {
  e.preventDefault();

  headerHome.insertAdjacentHTML('beforeend', myFilter());

  headerHome.classList.add('header__library');
  pageHome.classList.remove('link__current');
  libraryPage.classList.add('link__current');
  searchQuery.classList.add('invisible');
  getLibrary(); //*
}

function removeEvent(e) {
  libraryPage.removeEventListener(e, addLibraryPage);
}

function pageLibrary(e) {
  if (headerHome.classList.contains('header__library')) {
    e.preventDefault();
    const btnWatched = document.querySelector('.js-btn-watched'); //*
    const btnQueue = document.querySelector('.js-btn-queue'); //*
    btnWatched.classList.remove('isActive'); //*
    btnQueue.classList.remove('isActive'); //*
    getLibrary();
    return;
  }
  addLibraryPage(e);
  removeEvent(e);
}
libraryPage.addEventListener('click', pageLibrary);
