import renderTamplLibrary from './library-container.js';
const refs = { wrapperFilms: document.querySelector('.wrapper-films') };

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

const save = (key, value) => {
  try {
    const info = JSON.stringify(value);
    localStorage.setItem(key, info);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

// Переменные и запись данных в LocalStorage для проверки
// const myWatched = { "page": 1, "results": [{ "overview": "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence-a commodity capable of unlocking humanity's greatest potential-only those who can conquer their fear will survive.", "release_date": "2021-09-15", "id": 438631, "adult": false, "backdrop_path": "/eeijXm3553xvuFbkPFkDG6CLCbQ.jpg", "genre_ids": [28, 12, 878], "original_language": "en", "original_title": "Dune", "poster_path": "/d5NXSklXo0qyIYkgV94XAgMIckC.jpg", "vote_count": 3535, "video": false, "vote_average": 8, "title": "Dune", "popularity": 4080.34, "media_type": "movie" }, { "title": "The Suicide Squad", "adult": false, "backdrop_path": "/jlGmlFOcfo8n5tURmhC7YVd4Iyy.jpg", "genre_ids": [28, 12, 14, 35], "original_language": "en", "original_title": "The Suicide Squad", "poster_path": "/kb4s0ML0iVZlG6wAKbbs9NAm6X.jpg", "vote_count": 4676, "video": false, "id": 436969, "vote_average": 7.8, "overview": "Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.", "release_date": "2021-07-28", "popularity": 1010.69, "media_type": "movie" }], "total_pages": 1000, "total_results": 20000 };

// const que = {"page":1,"results":[{"adult":false,"backdrop_path":"/dgA83HDYm9SjfeiGT5AGlJpPPkj.jpg","genre_ids":[80,18],"id":747688,"original_language":"it","original_title":"Yara","overview":"The murder of 13-year-old Yara Gambirasio shocks the little town of Brembate di Sopra, Italy. To bring the culprit to justice, Prosecutor Letizia Ruggeri only has one tenuous lead — a bit of DNA that is not much help without a database to compare it to. Based on a true story.","poster_path":"/qRllCnVXSfOH665gWxOL4V6cj8b.jpg","release_date":"2021-10-18","title":"Yara","video":false,"vote_average":6.2,"vote_count":47,"popularity":19.517,"media_type":"movie"},{"original_title":"Father Christmas Is Back","poster_path":"/mI6mFCO3lrJ4ovzwfmoLs58uhlK.jpg","id":762469,"vote_average":4.7,"overview":"Caroline Christmas, a control freak desires nothing more than a perfect Christmas with her sisters at her lavish country manor to atone for the fact that their father abandoned them many years ago. When on Christmas Eve their long-lost father arrives at their doorstep with his new girlfriend, chaos ensues. Through a series of mishaps and misunderstandings, Caroline uncovers a long-buried family secret. Can the family still celebrate Christmas together after all?","release_date":"2021-11-07","vote_count":3,"adult":false,"backdrop_path":"/h3RUnNeAsH0gYlEDhH5bVvwoJNQ.jpg","video":false,"genre_ids":[35,10751],"title":"Father Christmas Is Back","original_language":"en","popularity":49.623,"media_type":"movie"},{"title":"The Suicide Squad","adult":false,"backdrop_path":"/jlGmlFOcfo8n5tURmhC7YVd4Iyy.jpg","genre_ids":[28,12,14,35],"original_language":"en","original_title":"The Suicide Squad","poster_path":"/kb4s0ML0iVZlG6wAKbbs9NAm6X.jpg","vote_count":4676,"video":false,"id":436969,"vote_average":7.8,"overview":"Supervillains Harley Quinn, Bloodsport, Peacemaker and a collection of nutty cons at Belle Reve prison join the super-secret, super-shady Task Force X as they are dropped off at the remote, enemy-infused island of Corto Maltese.","release_date":"2021-07-28","popularity":1010.69,"media_type":"movie"},{"overview":"An elite squad of Navy SEAL's, on a covert mission to transport a prisoner off a CIA black site island prison, are trapped when insurgents attack while trying to rescue the same prisoner.","release_date":"2021-11-05","id":811592,"adult":false,"backdrop_path":"/srJ7haOhfykoPOYPQrstOaFem08.jpg","genre_ids":[28],"original_language":"en","original_title":"One Shot","poster_path":"/3OXiTjU30gWtqxmx4BU9RVp2OTv.jpg","vote_count":5,"video":false,"vote_average":4.7,"title":"One Shot","popularity":86.481,"media_type":"movie"},{"backdrop_path":"/nDLylQOoIazGyYuWhk21Yww5FCb.jpg","genre_ids":[28,12,14],"original_language":"en","original_title":"Shang-Chi and the Legend of the Ten Rings","poster_path":"/1BIoJGKbXjdFDAqUEiA2VHqkK1Z.jpg","video":false,"vote_average":7.7,"vote_count":1405,"overview":"Shang-Chi must confront the past he thought he left behind when he is drawn into the web of the mysterious Ten Rings organization.","release_date":"2021-09-01","title":"Shang-Chi and the Legend of the Ten Rings","id":566525,"adult":false,"popularity":1275.766,"media_type":"movie"}],"total_pages":1000,"total_results":20000}

// save('watched', myWatched) 
// save('queue', que) // Переменные и запись данных в LocalStorage для проверки



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

    if (filmWatched !== undefined) {
        filmWatched.results.forEach(el => {
        r.push(el)
    })
    }
    if (filmQueue !== undefined) {
        filmQueue.results.forEach(el => {
        r.push(el)
    })
    }
    if (r.length == 0) {
        let markup = `<p>Your library is empty </p>`
        return refs.wrapperFilms.insertAdjacentHTML('beforeend', markup)
    }
    // console.log(r)
    

    updateDate(r);

    updateGenres(r);

    updateRating(r);

    renderTamplLibrary(r);
}

function clearMainContainer() {
  refs.wrapperFilms.innerHTML = '';
}

function updateDate(data) {
  data.map(el => {
    el.release_date = el.release_date.substring(0, 4);
  });

  return data;
}

function updateRating(data) {
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

function updateGenres(data) {
  const arrayGenres = JSON.parse(localStorage.getItem('genre')).genres;

  let id = [];
  let name = [];

  arrayGenres.forEach(el => {
    id.push(el.id);
    name.push(el.name);
  });

  data.map(el => {
    el.genre_ids.map((element, index, arr) => {
      const indexOf = id.indexOf(element);

      element = name[indexOf];

      arr.splice(index, 1, ` ${element}`);
    });

    if (el.genre_ids.length >= 3) {
      el.genre_ids.splice(2, 100, ' Other');
      return;
    }
  });

  return data;
}
