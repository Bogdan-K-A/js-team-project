import refs from './refs';
import API from './apiService';
const fetchDataByQuery = new API();
import mainGallery from '../templates/card-film.hbs';

import genresData from './data/genresData.json';
import { onCutDate, onToggleGenresData } from './components/newData';
import { updateGenres } from './getCards';
const { galleryList, inputQuery, inputForm, errorMsg } = refs;

inputForm.addEventListener('submit', onSearchSubmit);

async function onSearchSubmit(e) {
  e.preventDefault();
  galleryList.innerHTML = '';
  errorMsg.innerHTML = '';
  if (inputQuery.value === '') {
    return;
  }
  try {
    const data = await fetchDataByQuery.getQueryMovie(inputQuery.value);
    fetchDataByQuery.query = inputQuery.value;
    if (typeof data.results === 'undefined' || data.results.length < 1) {
      errorMsg.innerHTML =
        'Search result not successful. Enter the correct movie name and try again';
      return;
    }
    onCutDate(data);
    updateGenres(data);
    // onToggleGenresData(data, genresData);
    const markup = mainGallery(data);
    galleryList.insertAdjacentHTML('beforeend', markup);
  } catch (err) {
    console.log('fetchDataByQuery error');
  }
}
