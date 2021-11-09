import myFilter from '../templates/header-library.hbs';

const libraryPage = document.querySelector('.site-nav__link-library');
const headerHome = document.querySelector('.header');
const pageHome = document.querySelector('.site-nav__link-home');
const searchQuery = document.querySelector('.header-form');


function addLibraryPage (e) {
  e.preventDefault();
  
    headerHome.insertAdjacentHTML('beforeend', myFilter());
    
    headerHome.classList.add('header__library');
    pageHome.classList.remove('link__current');
    libraryPage.classList.add('link__current');
    searchQuery.classList.add('invisible')
    
};

function removeEvent (e) {
  libraryPage.removeEventListener(e, addLibraryPage);
};

function pageLibrary(e) {
  
    if (headerHome.classList.contains('header__library')) {
        e.preventDefault();
        return;
    }
    addLibraryPage(e);
    removeEvent(e);
 
}
libraryPage.addEventListener('click', pageLibrary);

