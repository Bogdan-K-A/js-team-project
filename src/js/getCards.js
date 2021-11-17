import ApiService from './apiService';
import card from '../templates/card-film.hbs';
import { spinerDel, spinerAdd } from './components/spiner';
import refs from './refs';
const { wrapperFilms } = refs;
const service = new ApiService();

export async function getCard() {
  try {
    spinerAdd();
    const data = await service.fetchFilms();

    const genre = await service.fetchGenre();

    updateDate(data);

    updateGenres(data);

    updateRating(data);

    wrapperFilms.insertAdjacentHTML('afterbegin', createCardFilm(data));
    spinerDel();
  } catch (error) {
    console.log(error);
  }
}

export function updateDate(data) {
  data.results.map(el => {
    if (el.release_date === undefined) {
      return;
    }
    // console.log(el.release_date);
    el.release_date = el.release_date.substring(0, 4);
  });

  return data;
}

export function updateRating(data) {
  data.results.map(el => {
    if (el.vote_average < 10) {
      el.vote_average = String(el.vote_average).padEnd(3, `.0`);
    }

    if (el.vote_average >= 10) {
      el.vote_average = String(el.vote_average).padEnd(4, `.0`);
    }
  });

  return data;
}

export function updateGenres(data) {
  const arrayGenres = JSON.parse(localStorage.getItem('genre')).genres;

  let id = [];
  let name = [];

  arrayGenres.forEach(el => {
    id.push(el.id);
    name.push(el.name);
  });

  data.results.map(el => {
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

export function createCardFilm(data) {
  return card(data);
}

getCard();
