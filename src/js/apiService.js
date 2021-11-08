
export default class ApiService {
  constructor() {
    this.keyword = '';
    this.page = 1;
  }
  async fetchFilms() {
    const API_KEY = '62d44ab5445de8b2c3bd077293892901';

    const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=${this.page}`;

    const responce = await fetch(URL);

    const result = await responce.json();

    localStorage.setItem('films', JSON.stringify(result))

    this.increamentPage();

    return result;
  }

  async fetchGenre(){
    const API_KEY = '62d44ab5445de8b2c3bd077293892901';

    const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

    const responce = await fetch(URL);

    const result = await responce.json();
    
    localStorage.setItem('genre', JSON.stringify(result))


    return result

  }

  resetPage() {
    this.page = 1;
  }

  increamentPage() {
    this.page += 1;
  }

  get query() {
    return this.keyword;
  }

  set query(newKeyword) {
    this.keyword = newKeyword;
  }
}
