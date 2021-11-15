import renderTamplLibrary from './library-container.js';
const refs = { wrapperFilms: document.querySelector('.wrapper-films') };
import { clearLib } from './clearLibrary'; //*
import { onBtnWatchedClick, onBtnQueueClick } from './btnWatched-Queue.js';


import { getCard, updateDate, updateGenres, updateRating, createCardFilm } from './getCards.js';
import ApiService from './apiService.js';
import { switchesPages } from './pagination'
const newService = new ApiService();
const paginationContainer = document.querySelector('.pagination')
const pagination = document.querySelector('.js-pagination');


// Local Storage
export const load = key => {
  try {
    const info = localStorage.getItem(key);

    return info === null ? undefined : JSON.parse(info);
  } catch (err) {
    console.error('Get state error: ', err);
  }
};

// Сlick on link "My Library"
  
let filmWatched = load('watched');
let filmQueue = load('queue');
let allMovies = [...filmWatched, ...filmQueue];
console.log(allMovies);


let b = []
const r = [];
export function getLibrary() {
  clearMainContainer();

  pagination.removeEventListener('click', switchesPages);
  pagination.addEventListener('click', switchesLibraryPages);
  
  pagination.innerHTML = '';
  let page = 1;
  createPageLibr(page);
    const btnWatched = document.querySelector('.js-btn-watched');
    const btnQueue = document.querySelector('.js-btn-queue');
    
    btnWatched.addEventListener('click', onBtnWatchedClick);
    btnQueue.addEventListener('click', onBtnQueueClick);
    
    // let filmWatched = load('watched');
    // let filmQueue = load('queue');
    
 if (filmWatched.length !== 0) {
    filmWatched.forEach(el => {
      r.push(el);
    });
  }
  if (filmQueue.length !== 0) {
    filmQueue.forEach(el => {
      r.push(el);
    });
  }
  if (r.length == 0) {
    pagination.removeEventListener('click', switchesPages);
    paginationContainer.innerHTML = '';
    const textLibrary = { text: 'No Movies' };
    return clearLib(textLibrary);
  }

  updateLDate(r);

  updateLGenres(r);

  updateLRating(r);

  console.log(allMovies);
    let a = { page: 1, films: [] }

  allMovies.forEach((el,index,array) => {
    
    a.films.push(el)

    if (a.films.length === 6) {
      b.push(a)
      a = { page: a.page + 1, films: [] }
      
    }
    if (el===array[array.length - 1]) {
        b.push(a)
      }

    
  })

const c = {...b}

  console.log(b);
  console.log(c);



  renderTamplLibrary(c[0].films);
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

let totalPage = Math.ceil((filmWatched.length += filmQueue.length) / 6); 
function createPageLibr(page) {
 
 let liTag = '';
  let activeLi;
  let beforePage = page - 1; // 20 - 1 = 19
  let afterPage = page + 1; // 20 + 1 = 21
console.log(totalPage);
/* ------------------------- добавляет стрелку влево ------------------------ */
  if (page > 1) {
    //если значение страницы больше 1, добавляем новый li, который является предыдущей кнопкой
    // liTag += `<li class="pagination-arrow" data-index="${page - 1}"><svg class="icon">
    //                 <use href="./images/icon/icons.svg#icon-arrow-left"></use>
    //             </svg></li>`;

    // ----------------------------------------
    liTag += `<li class="pagination-arrow" data-index="${
      page - 1
    }"><svg class="pag-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M12.6666 8H3.33325"

      />
    <path
        d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337"

      />
    </svg></li>`;
    // ----------------------------------------
  }

  /* ---------------------- добавляет ... вначале после 1 --------------------- */
  if (page > 2) {
    //если значение страницы больше 2, добавляем новый тег li с значением 1
    liTag += `<li class="num" data-index="1">1</li>`;

    if (page > 3) {
      //если значение страницы больше 3, добавляем новый тег li с значением ...
      liTag += `<li class="dots"><span>. . .</span></li>`;

      if (page > 4) {
        beforePage -= 1;
      }
      afterPage += 1;
    }
  }

  // /* ----- сколько страниц или li показывают до текущего li с левого краю ----- */
  // if (page === totalPage) {
  //   //если значение страницы равно общему количеству страниц, вычти -2 из значения предыдущей страницы
  //   afterPage;
  // } else if (page === totalPage - 1) {
  //   //а если значение страницы равно общему количеству страниц -1, вычти -1 из значения предыдущей страницы
  //   afterPage;
  // }

  /* ----------- сколько страниц или li показывают после текущего li с правого краю ---------- */
  // if (page === 1) {
  //   //если значение страницы равно 1, добавь +2 к значению после страницы
  //  beforePage;
  // }
  // else if (page === 2) {
  //   //а если значение страницы равно 2, добавь +1 к значению после страницы
  //   beforePage -= 1;
  // }

  /* --------------------------- добалляет нумерацию -------------------------- */
for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
    if (pageLength > totalPage) {
      continue;
    }
    if (pageLength === 0) {
      //если pageLangs равно 0, добавляем +1 к значению pageLangth
      pageLength += 1;
    }

    /* ----------------------- указывает активную страницу ---------------------- */
    if (page === pageLength) {
      //если значение страницы равно pageLength, тогда назначаем активную строку из переменной activeLy
      activeLi = 'active';
    } else {
      // в противном случае оставляем пустую строку в переменной activeLi
      activeLi = '';
    }

    liTag += `<li class="num ${activeLi}" data-index="${pageLength}">${pageLength}</li>`;
  }

  /* --------------- добавляет ... вконце перед последней цифрой -------------- */
  if (page < totalPage - 2) {
    //если значение страницы меньше totalPage на -1, то показать последний li или страницу, которая равна 20

    if (page < totalPage - 2) {
      //если значение страницы меньше totalPage на -2, тогда показывать последний ... предпоследний
      liTag += `<li class="dots"><span>. . .</span></li>`;
    }

    liTag += `<li class="num"  data-index="${totalPage}">${totalPage}</li>`;
  }

  /* ------------------------ добавляет стрелку вправо ------------------------ */
  if (page < totalPage) {
    //если значение страницы меньше общего значения страницы тогда, добавьте новый li, который является следующей кнопкой
    // liTag += `<li class="pagination-arrow"  data-index="${page + 1}" ><svg class="icon">
    //                 <use href="./images/icon/arrow-r.svg"></use>
    //             </svg></li>`;

  //   // ---------------------------------
    liTag += `<li class="pagination-arrow"  data-index="${
      page + 1
    }"><svg class="pag-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33341 8H12.6667"/>
    <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" />
    </svg></li>`;
    // ---------------------------------
  }
  pagination.innerHTML = liTag;
}

function switchesLibraryPages(e) {
  if (e.target.tagName !== 'LI') return;
  refs.wrapperFilms.innerHTML = '';
  let page = +e.target.dataset.index;
  console.log(page);
  if (allMovies.length > 6) {
   
 
 }
   console.log(allMovies);
 const k = {...b}
    createPageLibr(page);
    refs.wrapperFilms.insertAdjacentHTML('beforeend', renderTamplLibrary(k[Number(page)-1].films))
  
}

