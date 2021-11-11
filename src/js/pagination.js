// import libraryFilmCard from '../templates/library-film-render.hbs';
// import ApiService from './apiService.js';
// const service = new ApiService();
// import {wrapperFilms} from './library-container.js';//контеинер для списка фильмов

// const wrapper = document.querySelector('.wrapper');
// const pagination = document.querySelector('.js-pagination');
// const listPag = document.querySelector('.list-pagination');

// /* --------------------------------- рабочий -------------------------------- */

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
// let countOfItems = Math.ceil(users.length / numOfCardsPerPage); //округляет число карточек на странице
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
//     // console.log(item);
//   });
// }
// /* -------------------- показывает подсвечивает выбранную страницу ------------------- */
// function showPage(item) {
//   let pageNum = +item.innerHTML;
//   let start = (pageNum - 1) * numOfCardsPerPage;
//   let end = start + numOfCardsPerPage;
//   let notes = users.slice(start, end); // заменить API вместо users

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
//   wrapper.innerHTML = '';
// }

// /* ---------------------------- добавляет список на страницу ul--------------------------- */
// function createUl() {
//   let ul = document.createElement('ul');
//   wrapper.appendChild(ul);
//   ul.classList = 'movie-list';
// }

// /* ---------------------------- добавляет элементы li в список ul--------------------------- */
// function addsLiToUl(notes) {
//   let listPag = document.querySelector('.movie-list');
//   for (const note of notes) {
//     let itemMovie = [];

//     let li = document.createElement('li');
//     li.innerHTML = note.name; // вложить шаблон для списка фильмов
//     listPag.appendChild(li);
//     itemMovie.push(li);
//   }
// }

// =================================================================================================================================
/* ----------------------------- тут не работает  пагинатор---------------------------- */
// let totalPage = 20;

// function createPag(totalPage, page) {
//   let liTag = '';
//   let activeLi;
//   let beforePage = page - 1; // 20 - 1 = 19
//   let afterPage = page + 1; // 20 + 1 = 21

//   /* ------------------------- добавляет стрелку влево ------------------------ */
//   if (page > 1) {
//     //если значение страницы больше 1, добавляем новый li, который является предыдущей кнопкой
//     // onclick=createPag(totalPage, ${     page - 1  })"
//     liTag += `<li class="pagination-arrow" ><svg class="icon">
//                     <use href="./images/icon/icons.svg#icon-arrow-left"></use>
//                 </svg></li>`;
//   }

//   /* ---------------------- добавляет ... вначале после 1 --------------------- */
//   if (page > 2) {
//     //если значение страницы больше 2, добавляем новый тег li с значением 1
//     // onclick="createPag(totalPage, 1)"
//     liTag += `<li class="num" ><span>1</span></li>`;
//     if (page > 3) {
//       //если значение страницы больше 3, добавляем новый тег li с значением ...
//       liTag += `<li class="dots"><span>. . .</span></li>`;
//       beforePage = beforePage - 1;
//       afterPage = afterPage + 1;
//     }
//   }

//   /* ----- сколько страниц или li показывают до текущего li с левого краю ----- */
//   if (page === totalPage) {
//     //если значение страницы равно общему количеству страниц, вычти -2 из значения предыдущей страницы
//     beforePage = beforePage - 2;
//   } else if (page === totalPage - 1) {
//     //а если значение страницы равно общему количеству страниц -1, вычти -1 из значения предыдущей страницы
//     beforePage = beforePage - 1;
//   }

//   /* ----------- сколько страниц или li показывают после текущего li с правого краю ---------- */
//   if (page === 1) {
//     //если значение страницы равно 1, добавь +2 к значению после страницы
//     afterPage = afterPage + 2;
//   } else if (page === 2) {
//     //а если значение страницы равно 2, добавь +1 к значению после страницы
//     afterPage = afterPage + 1;
//   }

//   /* --------------------------- добалляет нумерацию -------------------------- */
//   for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
//     if (pageLength > totalPage) {
//       continue;
//     }
//     if (pageLength === 0) {
//       //если pageLangs равно 0, добавляем +1 к значению pageLangth
//       pageLength = pageLength + 1;
//     }

//     /* ----------------------- указывает активную страницу ---------------------- */
//     if (page === pageLength) {
//       //если значение страницы равно pageLength, тогда назначаем активную строку из переменной activeLy
//       activeLi = 'active';
//     } else {
//       // в противном случае оставляем пустую строку в переменной activeLi
//       activeLi = '';
//     }
//     // onclick="createPag(totalPage, ${pageLength})"
//     liTag += `<li class="num ${activeLi}" ><span>${pageLength}</span></li>`;
//   }

//   /* --------------- добавляет ... вконце перед последней цифрой -------------- */
//   if (page < totalPage - 2) {
//     //если значение страницы меньше totalPage на -1, то показать последний li или страницу, которая равна 20

//     if (page < totalPage - 2) {
//       //если значение страницы меньше totalPage на -2, тогда показывать последний ... предпоследний
//       liTag += `<li class="dots"><span>. . .</span></li>`;
//     }
//     // onclick="createPag(totalPage, ${totalPage})"
//     liTag += `<li class="num" ><span>${totalPage}</span></li>`;
//   }

//   /* ------------------------ добавляет стрелку вправо ------------------------ */
//   if (page < totalPage) {
//     //если значение страницы меньше общего значения страницы тогда, добавьте новый li, который является следующей кнопкой
//     // onclick="createPag(totalPage, ${
//     //       page + 1
//     //     })"
//     liTag += `<li class="pagination-arrow" ><svg class="icon">
//                     <use href="./images/icon/icons.svg#icon-arrow-right"></use>
//                 </svg></li>`;
//   }
//   listPag.innerHTML = liTag;
// }
// createPag(totalPage, 5);
// ========================================================================================================================
// ========================================================================================================================
/* ----------------------- пытаюсь применить замыкиние ---------------------- */

// const pagination = function (totalPage) {
//   // const totalPage = 20;

//   const createPag = function (page) {
//     let liTag = '';
//     let activeLi;
//     let beforePage = page - 1; // 20 - 1 = 19
//     let afterPage = page + 1; // 20 + 1 = 21

//     /* ------------------------- добавляет стрелку влево ------------------------ */
//     if (page > 1) {
//       //если значение страницы больше 1, добавляем новый li, который является предыдущей кнопкой
//       // onclick=createPag(totalPage, ${     page - 1  })"
//       liTag += `<li class="pagination-arrow" ><svg class="icon">
//                     <use href="./images/icon/icons.svg#icon-arrow-left"></use>
//                 </svg></li>`;
//     }

//     /* ---------------------- добавляет ... вначале после 1 --------------------- */
//     if (page > 2) {
//       //если значение страницы больше 2, добавляем новый тег li с значением 1
//       // onclick="createPag(totalPage, 1)"
//       liTag += `<li class="num" ><span>1</span></li>`;
//       if (page > 3) {
//         //если значение страницы больше 3, добавляем новый тег li с значением ...
//         liTag += `<li class="dots"><span>. . .</span></li>`;
//         beforePage = beforePage - 1;
//         afterPage = afterPage + 1;
//       }
//     }

//     /* ----- сколько страниц или li показывают до текущего li с левого краю ----- */
//     if (page === totalPage) {
//       //если значение страницы равно общему количеству страниц, вычти -2 из значения предыдущей страницы
//       beforePage = beforePage - 2;
//     } else if (page === totalPage - 1) {
//       //а если значение страницы равно общему количеству страниц -1, вычти -1 из значения предыдущей страницы
//       beforePage = beforePage - 1;
//     }

//     /* ----------- сколько страниц или li показывают после текущего li с правого краю ---------- */
//     if (page === 1) {
//       //если значение страницы равно 1, добавь +2 к значению после страницы
//       afterPage = afterPage + 2;
//     } else if (page === 2) {
//       //а если значение страницы равно 2, добавь +1 к значению после страницы
//       afterPage = afterPage + 1;
//     }

//     /* --------------------------- добалляет нумерацию -------------------------- */
//     for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
//       if (pageLength > totalPage) {
//         continue;
//       }
//       if (pageLength === 0) {
//         //если pageLangs равно 0, добавляем +1 к значению pageLangth
//         pageLength = pageLength + 1;
//       }

//       /* ----------------------- указывает активную страницу ---------------------- */
//       if (page === pageLength) {
//         //если значение страницы равно pageLength, тогда назначаем активную строку из переменной activeLy
//         activeLi = 'active';
//       } else {
//         // в противном случае оставляем пустую строку в переменной activeLi
//         activeLi = '';
//       }
//       // onclick="createPag(totalPage, ${pageLength})"
//       liTag += `<li class="num ${activeLi}" ><span>${pageLength}</span></li>`;
//     }

//     /* --------------- добавляет ... вконце перед последней цифрой -------------- */
//     if (page < totalPage - 2) {
//       //если значение страницы меньше totalPage на -1, то показать последний li или страницу, которая равна 20

//       if (page < totalPage - 2) {
//         //если значение страницы меньше totalPage на -2, тогда показывать последний ... предпоследний
//         liTag += `<li class="dots"><span>. . .</span></li>`;
//       }
//       // onclick="createPag(totalPage, ${totalPage})"
//       liTag += `<li class="num" ><span>${totalPage}</span></li>`;
//     }

//     /* ------------------------ добавляет стрелку вправо ------------------------ */
//     if (page < totalPage) {
//       //если значение страницы меньше общего значения страницы тогда, добавьте новый li, который является следующей кнопкой
//       // onclick="createPag(totalPage, ${
//       //       page + 1
//       //     })"
//       liTag += `<li class="pagination-arrow" ><svg class="icon">
//                     <use href="./images/icon/icons.svg#icon-arrow-right"></use>
//                 </svg></li>`;
//     }
//     listPag.innerHTML = liTag;
//     console.log('object');
//   };
//   return createPag;
// };

// const pag = pagination(20);
// // pag();
// // createPag(totalPage, 5);
// // listPag.addEventListener('click');
// console.log(pag);
