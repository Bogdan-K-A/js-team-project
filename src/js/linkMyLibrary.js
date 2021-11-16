import renderTamplLibrary from './library-container.js';
const refs = { wrapperFilms: document.querySelector('.wrapper-films') };
import { clearLib } from './clearLibrary'; 

const pagination = document.querySelector('.js-pagination');

// Local Storage
const load = key => {
  try {
    const info = localStorage.getItem(key);

    return info === null ? undefined : JSON.parse(info);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

// Сlick on link "My Library"
 
export function getLibrary() {
  clearMainContainer();
  pagination.innerHTML = ''
  // pagination.removeEventListener('click', switchesPages);
  // pagination.addEventListener('click', switchesLibraryPages);
  
  const btnWatched = document.querySelector('.js-btn-watched');
  const btnQueue = document.querySelector('.js-btn-queue');
    
  btnWatched.addEventListener('click', onBtnWatchedClick);
  btnQueue.addEventListener('click', onBtnQueueClick);
  onBtnWatchedClick();
}

function clearMainContainer() {
  refs.wrapperFilms.innerHTML = '';
}

export function onBtnWatchedClick() {
    clearMainContainer(); 
    const btnWatched = document.querySelector('.js-btn-watched');
    const btnQueue = document.querySelector('.js-btn-queue');
    btnWatched.classList.add("isActive");
    btnQueue.classList.remove("isActive");

    let filmWatched = load('watched');
    
    if (filmWatched.length !== 0) {
        updateLDate(filmWatched);
        updateLGenres(filmWatched);
        updateLRating(filmWatched);
        
        renderTamplLibrary(filmWatched);
    }
    
    else {
        const textLibrary = { text: 'No movies watched' };
        return clearLib(textLibrary)
    }
    
}

export function onBtnQueueClick() {
    clearMainContainer();
    const btnWatched = document.querySelector('.js-btn-watched');
    const btnQueue = document.querySelector('.js-btn-queue');
    btnWatched.classList.remove("isActive");
    btnQueue.classList.add("isActive");
    let filmQueue = load('queue');
    
    if (filmQueue.length !== 0) {
        updateLDate(filmQueue);
        updateLGenres(filmQueue);
        updateLRating(filmQueue);
        
        renderTamplLibrary(filmQueue);
    }
    
    else {
        const textLibrary = { text: 'No movies added' };
        return clearLib(textLibrary)
    }
    
}

export function updateLDate(data) {
  data.map(el => {
    el.release_date = el.release_date.substring(0, 4);
  });

  return data;
}

export function updateLRating(data) {
  data.map(el => {
    if (el.vote_average < 10) {
      el.vote_average = String(el.vote_average).padEnd(3, `.0`);
    }

    if (el.vote_average >= 10) {
      el.vote_average = String(el.vote_average).padEnd(4, `.0`);
    }
  });

  return data;
}

export function updateLGenres(data) {
  const arrayGenres = JSON.parse(localStorage.getItem('genre')).genres;

  let id = [];
  let name = [];

  arrayGenres.forEach(el => {
    id.push(el.id);
    name.push(el.name);
  });

  data.map(el => {
    el.genres.map((element, index, arr) => {
      const indexOf = id.indexOf(element.id);
      element = name[indexOf];
      arr.splice(index, 1, ` ${element}`);
    });

    if (el.genres.length >= 3) {
      el.genres.splice(2, 100, ' Other');
      return;
    }
  });

  return data;
}










