import libraryFilmCard from '../templates/library-film-render.hbs';
import refs from './refs';
const { wrapperFilms } = refs;

// source - object from LocalStorage (key- "watched" || "queve")
export default function renderTamplLibrary(source) {
  let markupLibrary = libraryFilmCard(source);
  return refs.wrapperFilms.insertAdjacentHTML('beforeend', markupLibrary);
}
