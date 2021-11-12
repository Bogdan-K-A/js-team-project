export default class ApiService {
  constructor() {
    this.keyword = '';

    this.page = 1;

    this.API_KEY = '62d44ab5445de8b2c3bd077293892901';
  }

  async fetchFilms() {
    const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${this.API_KEY}&page=${this.page}`;

    const responce = await fetch(URL);

    const result = await responce.json();

    localStorage.setItem('films', JSON.stringify(result));

    this.increamentPage();

    return result;
  }

  async fetchFilmsKeyWord() {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&query=${this.keyword}&page=${this.page}`;

    const responce = await fetch(URL);

    const result = await responce.json();

    console.log(result);
  }

  async getQueryMovie(q) {
    localStorage.setItem('query', q);
    const queryValue = `&query=${q}`;
    const queryData = `https://api.themoviedb.org/3/search/movie?api_key=${this.API_KEY}&language=en-US&page=${this.page}&include_adult=false`;
    try {
      const result = await fetch(`${queryData}${queryValue}`);
      const response = result.json();
      return response;
    } catch (err) {
      console.log('error');
    }
  }

  async fetchGenre() {
    const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.API_KEY}&language=en-US`;

    const responce = await fetch(URL);

    const result = await responce.json();

    localStorage.setItem('genre', JSON.stringify(result));

    return result;
  }

  resetPage() {
    this.page = 1;
  }

  increamentPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  get query() {
    return this.keyword;
  }

  set query(newKeyword) {
    this.keyword = newKeyword;
  }
  async getDescriptionMovie(id) {
    const queryData = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.API_KEY}&language=en-US`;
    try {
      const result = await fetch(`${queryData}`);
      const response = result.json();
      return response;
    } catch (err) {
      console.log('error');
    }
  }
  async getFetchTrailerSearch(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.API_KEY}&language=en-US`;
    try {
      const result = await fetch(`${url}`)
      const response = result.json();
      return response;
    } catch (err) {
      console.log('error');
    }
  }
}
