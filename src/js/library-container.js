import libraryFilmCard from '../templates/library-film-render.hbs';
const refs = { wrapperFilms: document.querySelector('.wrapper-films') };

// source - object from LocalStorage (key- "watched" || "queve")
export function renderTamplLibrary(source) {
    let markupLibrary = libraryFilmCard(source)
    return refs.wrapperFilms.insertAdjacentHTML('beforeend', markupLibrary)
}









