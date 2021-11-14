

const modalDiv = document.querySelector('.modal_backdrop');

renderWatch();
renderQueue();
// додає і перевіряє обєкт Watched на LocalStoreg
function renderWatch() {
  if (localStorage.getItem('watched')) {
    return;
  } else {
    localStorage.setItem('watched', JSON.stringify([]));
  }
}

// додає і перевіряє обєкт Queue на LocalStoreg
function renderQueue() {
  if (localStorage.getItem('queue')) {
    return;
  }
  localStorage.setItem('queue', JSON.stringify([]));
}

// добавляє і видаляє фільм на обєкт Watched
export function addToLocalStorWatched() {
  const btnWatch = document.querySelector('.modal_btn_wotched');

  btnWatch.addEventListener('click', onWatched);

  function onWatched(e) {
    e.preventDefault();

    // добавляє фільм
    if (btnWatch.textContent === 'add to Watched') {
      btnWatch.textContent = 'remowe to Watched';
      btnWatch.classList.add('active');

      addLocalStorObjectWatch();
      btnWatch.classList.add('active')
      // забирає обєкт з фільмом який зараз на модальному вікні і розпарсує його
      const films = localStorage.getItem('currentFilm');
      const addFilms = JSON.parse(films);
      // забирає обєкт з LocalStoreg і розпарсує його
      const currentStore = localStorage.getItem('watched');
      const parseStore = JSON.parse(currentStore);
      // добавляє фільм в обєкт і записує в LocalStoreg
      parseStore.push(addFilms);
      localStorage.setItem('watched', JSON.stringify(parseStore));

      //======Перевірка та видалення того ж фільму з Queue===========*
      const btnQueue = document.querySelector('.modal_btn_queue');
      btnQueue.textContent = 'add to queue';
      btnQueue.classList.remove('active');
      const currentQ = localStorage.getItem('queue');
      const parseQ = JSON.parse(currentQ);

      const removeFilms = parseQ.filter(e => e.id !== addFilms.id);
      localStorage.setItem('queue', JSON.stringify(removeFilms));
      //=================================================*

      // видаляє фільм
    } else if (btnWatch.textContent === 'remowe to Watched') {
      btnWatch.textContent = 'add to Watched';
      btnWatch.classList.remove('active');

      remoweLocalStorObjectWatch();

      // обновляння сторінки при видаляня фільму
      const watchedEl = document.querySelector('.js-btn-watched');
      const libraryEl = document.querySelector('.site-nav__link-library');
      const wrapperFilms = document.querySelector('.wrapper-films');

      if (libraryEl.classList.contains('link__current')) {
        wrapperFilms.innerHTML = '';

        remoweLocalStorObjectWatch();

        getLibrary();
      } else {
        btnWatch.textContent = 'add to Watched';
        btnWatch.classList.remove('active');

        remoweLocalStorObjectWatch();
      }

      if (watchedEl.classList.contains('isActive')) {
        wrapperFilms.innerHTML = '';
        remoweLocalStorObjectWatch();
        getLibrary();
      } else {
        btnWatch.textContent = 'add to Watched';
        btnWatch.classList.remove('active');

        remoweLocalStorObjectWatch();
      }
    }
  }
}

// добавляє і видаляє фільм на обєкт Queue
export function addToLocalStorQueue() {
  const btnQueue = document.querySelector('.modal_btn_queue');

  btnQueue.addEventListener('click', onQueue);

  function onQueue(e) {
    e.preventDefault();

    // добавляє фільм
    if (btnQueue.textContent === 'add to queue') {
      btnQueue.textContent = 'remowe to queue';
      btnQueue.classList.add('active');

      addLocalStorObjectQueue();

      //======Перевірка та видалення того ж фільму з Watched===========*
      const btnWatch = document.querySelector('.modal_btn_wotched');
      btnWatch.textContent = 'add to Watched';
      btnWatch.classList.remove('active');
      const currentW = localStorage.getItem('watched');
      const parseW = JSON.parse(currentW);

      const removeFilms = parseW.filter(e => e.id !== addFilms.id);
      localStorage.setItem('watched', JSON.stringify(removeFilms));
      //==========================================*

      // видаляє фільм
    } else if (btnQueue.textContent === 'remowe to queue') {
      btnQueue.textContent = 'add to queue';
      btnQueue.classList.remove('active');

      remoweLocalStorObjectQueue();

      const queueEl = document.querySelector('.js-btn-queue');
      const libraryEl = document.querySelector('.site-nav__link-library');
      const wrapperFilms = document.querySelector('.wrapper-films');

      if (libraryEl.classList.contains('link__current')) {
        wrapperFilms.innerHTML = '';

        remoweLocalStorObjectQueue();

        getLibrary();
      } else {
        btnQueue.textContent = 'add to queue';
        btnQueue.classList.remove('active');

        remoweLocalStorObjectQueue();
      }

      if (queueEl.classList.contains('isActive')) {
        wrapperFilms.innerHTML = '';

        remoweLocalStorObjectQueue();

        getLibrary();
      } else {
        btnQueue.textContent = 'add to queue';
        btnQueue.classList.remove('active');

        remoweLocalStorObjectQueue();
      }
    }
  }
}

// перевіряє кнопку Watched при рендері модалки
export function renderBtnWatch() {
  // забирає обєкт з фільмом який зараз на модальному вікні і розпарсує його
  const films = localStorage.getItem('currentFilm');
  const addFilms = JSON.parse(films);

  // забирає обєкт з LocalStoreg і розпарсує його
  const currentStore = localStorage.getItem('watched');
  const parseStore = JSON.parse(currentStore);
  const btnWatch = document.querySelector('.modal_btn_wotched');

  // перевірка кнопки
  if (parseStore.some(e => e.id === addFilms.id)) {
    btnWatch.textContent = 'remowe to Watched';
    btnWatch.classList.add('active');
  }
}

// перевіряє кнопку Queue при рендері модалки
export function renderBtnQueue() {
  // забирає обєкт з фільмом який зараз на модальному вікні і розпарсує його
  const films = localStorage.getItem('currentFilm');
  const addFilms = JSON.parse(films);

  // забирає обєкт з LocalStoreg і розпарсує його
  const currentStore = localStorage.getItem('queue');
  const parseStore = JSON.parse(currentStore);

  const btnQueue = document.querySelector('.modal_btn_queue');

  // перевірка кнопки
  if (parseStore.some(e => e.id === addFilms.id)) {
    btnQueue.textContent = 'remowe to queue';
    btnQueue.classList.add('active');
  }
}
