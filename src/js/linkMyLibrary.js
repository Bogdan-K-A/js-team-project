import renderTamplLibrary from './library-container.js';
import clearLibrary from '../templates/clear-library.hbs'; //+
const refs = { wrapperFilms: document.querySelector('.wrapper-films') };
import { clearLib } from './clearLibrary'; //*
import { onBtnWatchedClick, onBtnQueueClick } from './btnWatched-Queue.js';

// Local Storage
export const load = key => {
  try {
    const info = localStorage.getItem(key);

      return info === null ? undefined : JSON.parse(info);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

// const save = (key, value) => {  //-
//   try {
//     const info = JSON.stringify(value);
//     localStorage.setItem(key, info);
//   } catch (err) {
//     console.error('Set state error: ', err);
//   }
// };

// Сlick on link "My Library"
const linkLibrary = document.querySelector('#library');
linkLibrary.addEventListener('click', onClickLibrary);

function onClickLibrary() {
    clearMainContainer();
    
    const btnWatched = document.querySelector('.js-btn-watched');
    const btnQueue = document.querySelector('.js-btn-queue');
    
    btnWatched.addEventListener('click', onBtnWatchedClick);
    btnQueue.addEventListener('click', onBtnQueueClick);
    
    
    let filmWatched = load('watched');
    
    let filmQueue = load('queue');
    
  const r = [];

    if (filmWatched.length !== 0) {
        filmWatched.forEach(el => {
        r.push(el)
    })
    }
    if (filmQueue.length !== 0) {
        filmQueue.forEach(el => {
        r.push(el)
    })
    }
  if (r.length == 0) {
      // console.log('empty')
      // let markup = clearLib(); //-
      // return refs.wrapperFilms.insertAdjacentHTML('beforeend', markup) //*
    return clearLib()
    }
    
    updateLDate(r);

    updateLGenres(r);

    updateLRating(r);

    renderTamplLibrary(r);
}

function clearMainContainer() {
  refs.wrapperFilms.innerHTML = '';
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
