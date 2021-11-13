import { getCard, updateDate, updateGenres, updateRating } from './getCards.js';
import ApiService from './apiService.js';
import { createCardFilm } from './getCards';
const service = new ApiService();

const refs = { wrapperFilms: document.querySelector('.wrapper-films') };
const pagination = document.querySelector('.js-pagination');
// const wrapper = document.querySelector('.wrapper');
// const listPag = document.querySelector('.list-pagination');

/* ------------------------ РАБОЧИЙ!!!!!!!!!!!!!!!!!! V1----------------------- */

createPag(1);

async function createPag(page) {
  let liTag = '';
  let activeLi;
  let beforePage = page - 1; // 20 - 1 = 19
  let afterPage = page + 1; // 20 + 1 = 21

  const data = await service.fetchFilms();
  let totalPage = data.total_pages;

  // let beforePage = service.decrementPage(); // 20 - 1 = 19
  // let afterPage = service.increamentPage(); // 20 - 1 = 19
  // clearPage();

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

  /* ----- сколько страниц или li показывают до текущего li с левого краю ----- */
  if (page === totalPage) {
    //если значение страницы равно общему количеству страниц, вычти -2 из значения предыдущей страницы
    beforePage -= 2;
  } else if (page === totalPage - 1) {
    //а если значение страницы равно общему количеству страниц -1, вычти -1 из значения предыдущей страницы
    beforePage -= 1;
  }

  /* ----------- сколько страниц или li показывают после текущего li с правого краю ---------- */
  if (page === 1) {
    //если значение страницы равно 1, добавь +2 к значению после страницы
    afterPage += 2;
  } else if (page === 2) {
    //а если значение страницы равно 2, добавь +1 к значению после страницы
    afterPage += 1;
  }

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
      // service.increamentPage();
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

    // ---------------------------------
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
// /* ----------------------------рендерит пагинатор на страницу, createPag(общее кол страниц, начало призагрузке)---------------------------- */
/* -------------------------- переключатель страниц ------------------------- */
async function switchesPages(e) {
  if (e.target.tagName !== 'LI') return;

  clearPage();

  service.page = +e.target.dataset.index;

  const data = await service.fetchFilms();
  // console.log(data);
  updateDate(data);

  updateGenres(data);

  updateRating(data);

  createPag(+e.target.dataset.index);

  refs.wrapperFilms.insertAdjacentHTML('beforeend', createCardFilm(data));
}
// /* ---------------------------- очищает страницу при переходе на следующюю ---------------------------- */
function clearPage() {
  // wrapper.innerHTML = '';
  refs.wrapperFilms.innerHTML = '';
}
/* --------------------- слгшатель событий на пагинатор --------------------- */
pagination.addEventListener('click', switchesPages);
// =================================================================================================================

/* --------------------------------- рабочий V2-------------------------------- */

// let users = [
//   // вложыть функцию высова списка фильмов

//   { name: 'name1', age: 23 },
//   { name: 'name2', age: 23 },
//   { name: 'name3', age: 23 },
//   { name: 'name4', age: 23 },
//   { name: 'name5', age: 23 },
//   { name: 'name6', age: 23 },
//   { name: 'name7', age: 23 },
//   { name: 'name8', age: 23 },
//   { name: 'name9', age: 23 },
//   { name: 'name10', age: 23 },
//   { name: 'name11', age: 23 },
// ];
// let numOfCardsPerPage = 2;
// // let numOfCardsPerPage = service.results;
// let countOfItems = Math.ceil(users.length / numOfCardsPerPage); //округляет число карточек на странице
// // let countOfItems = Math.ceil(data.total_results / numOfCardsPerPage); //округляет число карточек на странице
// let items = [];
// /* ----------------------- пагинация ---------------------- */

// for (let i = 1; i <= countOfItems; i++) {
//   let li = document.createElement('li');
//   li.classList = 'num';

//   li.innerHTML = i;

//   // console.log(li);

//   pagination.appendChild(li);
//   items.push(li);
// }

// /* --------------------- вызов функции текущей страницы --------------------- */
// showPage(items[0]);

// // присваивает слушатель событий к каждой цифре и автоматически ращитывает количество страниц

// for (const item of items) {
//   item.addEventListener('click', function () {
//     showPage(item);
//     service.increamentPage();
//     // console.log(service);
//     getCard();
//     // console.log(item);
//   });
// }
// /* -------------------- показывает подсвечивает выбранную страницу ------------------- */
// function showPage(item) {
//   let pageNum = +item.innerHTML;
//   let start = (pageNum - 1) * numOfCardsPerPage;
//   let end = start + numOfCardsPerPage;
//   let notes = users.slice(start, end); // заменить API вместо users
//   // let notes = data.total_results.slice(start, end); // заменить API вместо users

//   removeCurrentColorPage();

//   currentColorPage(item);

//   clearPage();

//   createUl();

//   addsLiToUl(notes);
// }

// /* --------------------  подсвечивает текущюю страницу ------------------- */
// function currentColorPage(item) {
//   item.classList.add('active');
// }
// /* ---------------------------- очищает текущий цвет страницы при переходе на следующюю ---------------------------- */
// function removeCurrentColorPage() {
//   let activeLi = document.querySelector('.active');
//   if (activeLi) {
//     activeLi.classList.remove('active');
//   }
// }

// /* ---------------------------- очищает страницу при переходе на следующюю ---------------------------- */
// function clearPage() {
//   // wrapper.innerHTML = '';
//   refs.wrapperFilms.innerHTML = '';
// }

// /* ---------------------------- добавляет список на страницу ul--------------------------- */
// function createUl() {
//   let ul = document.createElement('ul');
//   // wrapper.appendChild(ul);
//   refs.wrapperFilms.appendChild(ul);
//   ul.classList = 'movie-list';
// }

// /* ---------------------------- добавляет элементы li в список ul--------------------------- */
// function addsLiToUl(notes) {
//   let listPag = document.querySelector('.movie-list');
//   for (const note of notes) {
//     let itemMovie = [];

//     let li = document.createElement('li');
//     // li.innerHTML = note.name; // вложить шаблон для списка фильмов
//     listPag.appendChild(li);
//     itemMovie.push(li);
//   }
// }

// =================================================================================================================================
