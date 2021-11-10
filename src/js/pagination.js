const contsiner = document.querySelector('.pagination');
const listPag = document.querySelector('.list-pagination');
let totalPage = 20;

function createPag(totalPage, page) {
  let liTag = '';
  let activeLi;
  let beforePage = page - 1; // 20 - 1 = 19
  let afterPage = page + 1; // 20 + 1 = 21

  /* ------------------------- добавляет стрелку влево ------------------------ */
  if (page > 1) {
    //если значение страницы больше 1, добавляем новый li, который является предыдущей кнопкой
    // width="16" height="16
    liTag += `<li class="pagination-icon-left" onclick="createPag(totalPage, ${
      page - 1
    })"><svg class="icon">
                    <use href="../images/icon/icons.svg#icon-arrow-left"></use>
                </svg></li>`;
  }

  /* ---------------------- добавляет ... вначале после 1 --------------------- */
  if (page > 2) {
    //если значение страницы больше 2, добавляем новый тег li с значением 1
    liTag += `<li class="num" onclick="createPag(totalPage, 1)"><span>1</span></li>`;
    if (page > 3) {
      //если значение страницы больше 3, добавляем новый тег li с значением ...
      liTag += `<li class="dots"><span>. . .</span></li>`;
      beforePage = beforePage - 1;
      afterPage = afterPage + 1;
    }
  }

  /* ----- сколько страниц или li показывают до текущего li с левого краю ----- */
  if (page === totalPage) {
    //если значение страницы равно общему количеству страниц, вычти -2 из значения предыдущей страницы
    beforePage = beforePage - 2;
  } else if (page === totalPage - 1) {
    //а если значение страницы равно общему количеству страниц -1, вычти -1 из значения предыдущей страницы
    beforePage = beforePage - 1;
  }

  /* ----------- сколько страниц или li показывают после текущего li с правого краю ---------- */
  if (page === 1) {
    //если значение страницы равно 1, добавь +2 к значению после страницы
    afterPage = afterPage + 2;
  } else if (page === 2) {
    //а если значение страницы равно 2, добавь +1 к значению после страницы
    afterPage = afterPage + 1;
  }

  /* --------------------------- добалляет нумерацию -------------------------- */
  for (let pageLength = beforePage; pageLength <= afterPage; pageLength++) {
    if (pageLength > totalPage) {
      continue;
    }
    if (pageLength === 0) {
      //если pageLangs равно 0, добавляем +1 к значению pageLangth
      pageLength = pageLength + 1;
    }

    /* ----------------------- указывает активную страницу ---------------------- */
    if (page === pageLength) {
      //если значение страницы равно pageLength, тогда назначаем активную строку из переменной activeLy
      activeLi = 'active';
    } else {
      // в противном случае оставляем пустую строку в переменной activeLi
      activeLi = '';
    }

    liTag += `<li class="num ${activeLi}" onclick="createPag(totalPage, ${pageLength})"><span>${pageLength}</span></li>`;
  }

  /* --------------- добавляет ... вконце перед последней цифрой -------------- */
  if (page < totalPage - 2) {
    //если значение страницы меньше totalPage на -1, то показать последний li или страницу, которая равна 20

    if (page < totalPage - 2) {
      //если значение страницы меньше totalPage на -2, тогда показывать последний ... предпоследний
      liTag += `<li class="dots"><span>. . .</span></li>`;
    }
    liTag += `<li class="num" onclick="createPag(totalPage, ${totalPage})"><span>${totalPage}</span></li>`;
  }

  /* ------------------------ добавляет стрелку вправо ------------------------ */
  if (page < totalPage) {
    //если значение страницы меньше общего значения страницы тогда, добавьте новый li, который является следующей кнопкой
    liTag += `<li class="pagination-icon-right" onclick="createPag(totalPage, ${
      page + 1
    })"><svg width="16" height="16">
                    <use href="../images/icon/icons.svg#icon-arrow-right"></use>
                </svg></li>`;
  }
  listPag.innerHTML = liTag;
}

createPag(totalPage, 5);
