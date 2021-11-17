import refs from './refs';
import API from './apiService';
const fetchDataByQuery = new API();
import mainGallery from '../templates/card-film.hbs';
import { getCard, updateDate, updateGenres, updateRating } from './getCards.js';
import { switchesPages, createPag } from './pagination';
const debounce = require('lodash.debounce');
const { galleryList, inputQuery, inputForm, errorMsg, pagination } = refs;

inputForm.addEventListener('input', debounce(onSearchSubmit, 1000));

function countrySearchInputHandler(e) {
  e.preventDefault();
  clearArticlesContainer();
  if (data.status === 404) {
    error({
      text: 'No film has been found. Please enter a more specific query!',
    });
  }
}

export async function onSearchSubmit(e) {
  e.preventDefault();

  galleryList.innerHTML = '';
  errorMsg.innerHTML = '';
  if (inputQuery.value === '') {
    inputForm.removeEventListener('input', debounce(onSearchSubmit, 1000));
    pagination.removeEventListener('click', switchesInputPages);
    pagination.innerHTML = '';
    pagination.addEventListener('click', switchesPages);
    createPag(1);
    getCard();
    return;
  }
  try {
    pagination.removeEventListener('click', switchesPages);
    pagination.addEventListener('click', switchesInputPages);

    pagination.innerHTML = '';
    const page = 1;
    fetchDataByQuery.resetPage(page)
    createPageInput(page);

    const data = await fetchDataByQuery.getQueryMovie(inputQuery.value);

    fetchDataByQuery.query = inputQuery.value;
    
    if (typeof data.results === 'undefined' || data.results.length < 1) {
      errorMsg.innerHTML =
        'Search result not successful. Enter the correct movie name and try again';
      setTimeout(()=>{clearInput()},3000)
      getCard();
      return;
    } else {
      
      updateDate(data);

      updateGenres(data);

      updateRating(data);

      const markup = mainGallery(data);
    console.log(data);
      galleryList.insertAdjacentHTML('beforeend', markup);
    }
  } catch (err) {
    console.log('fetchDataByQuery error');
  }
}

async function createPageInput(page) {
  let liTag = '';
  let activeLi;
  let beforePage = page - 1; // 20 - 1 = 19
  let afterPage = page + 1; // 20 + 1 = 21

  const data = await fetchDataByQuery.getQueryMovie(inputQuery.value);
  let totalPage = data.total_pages;
  // console.log(totalPage);
  /* ------------------------- добавляет стрелку влево ------------------------ */
  if (page > 1) {
    //если значение страницы больше 1, добавляем новый li, который является предыдущей кнопкой
    liTag += `<li class="pagination-arrow" data-index="${
      page - 1
    }"><svg class="pag-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.6666 8H3.33325"/>
    <path d="M7.99992 12.6667L3.33325 8.00004L7.99992 3.33337"/>
    </svg></li>`;
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
    afterPage += 2;
  } else if (page === totalPage - 1) {
    //а если значение страницы равно общему количеству страниц -1, вычти -1 из значения предыдущей страницы
    afterPage += 1;
  }
  /* ----------- сколько страниц или li показывают после текущего li с правого краю ---------- */
  if (page === 1) {
    //если значение страницы равно 1, добавь +2 к значению после страницы
    beforePage;
  } else if (page === 2) {
    //а если значение страницы равно 2, добавь +1 к значению после страницы
    beforePage -= 1;
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
    liTag += `<li class="pagination-arrow"  data-index="${
      page + 1
    }"><svg class="pag-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33341 8H12.6667"/>
    <path d="M8.00008 12.6667L12.6667 8.00004L8.00008 3.33337" />
    </svg></li>`;
  }
  pagination.innerHTML = liTag;
}

export async function switchesInputPages(e) {
  if (e.target.tagName !== 'LI') return;

  galleryList.innerHTML = '';

  fetchDataByQuery.page = +e.target.dataset.index;

  const data = await fetchDataByQuery.getQueryMovie(inputQuery.value);
  updateDate(data);

  updateGenres(data);

  updateRating(data);

  createPageInput(+e.target.dataset.index);

  galleryList.insertAdjacentHTML('beforeend', mainGallery(data));
}

function clearArticlesContainer() {
  galleryList.innerHTML = '';
}

function clearInput() {
  errorMsg.innerHTML = '';
  inputQuery.value=''
}