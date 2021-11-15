import refs from './refs';
import API from './apiService';
const fetchDataByQuery = new API();
import mainGallery from '../templates/card-film.hbs';
const debounce = require('lodash.debounce');

import genresData from './data/genresData.json';
import { onCutDate, onToggleGenresData } from './components/newData';
import { updateGenres } from './getCards';
const { galleryList, inputQuery, inputForm, errorMsg } = refs;

inputForm.addEventListener('input', onSearchSubmit, debounce(countrySearchInputHandler, 500));

function countrySearchInputHandler(e) {
  e.preventDefault();
  clearArticlesContainer();
  if (data.status === 404) {
    error({
      text: 'No film has been found. Please enter a more specific query!',
    });
  }
}

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

function clearArticlesContainer() {
  galleryList.innerHTML = '';
}
