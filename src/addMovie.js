import movies from './data.js';
import addListItem from './listItem.js';
import API_KEY from '../config.js';

class AddMovie extends HTMLElement {
  constructor() {
    super();

    this.fetchMovies.bind(this);
  };

  fetchMovies(e) {
    e.preventDefault();
    if (document.getElementById('search-input').value) {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${document.getElementById('search-input').value}`)
        .then((response) => response.json())
        .then((data) => data.results[0].id)
        .then((movieId) => fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US`))
        .then((response) => response.json())
        .then((data) => {
          const movie = {
            movieName: data.original_title,
            rating: data.vote_average,
            description: data.overview,
            runtime: data.runtime,
            imdb_id: data.imdb_id, // https://www.imdb.com/title/${movie.imdb_id}/
            genres: data.genres.map((genre) => genre.name).join(', '),
            poster: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            backdrop:`https://image.tmdb.org/t/p/w780${data.backdrop_path}`,
            release_date: data.release_date,
          }
          console.log(movie);
          movies.push(movie);
          return movie;
        })
        .then((movie) => {
          addListItem(movie);
          document.getElementById('search-input').value = '';
        })
        .catch((err) => new Error(err));
    } else {
      alert('please enter a search term');
    }
  };

  connectedCallback() {
    this.render();
    document.getElementById('search-button').addEventListener('click', this.fetchMovies);
    document.getElementById('search-form').addEventListener('submit', this.fetchMovies);
  }

  render() {
    this.innerHTML = `
      <div class="search-container">
        <form class="search-form" id="search-form">
          <input
            type="text"
            class="search-input"
            id="search-input"
            name="search-input"
            placeholder="Search for a movie!">
          <input
            type="button"
            id="search-button"
            class="search-button"
            name="submit-button"
            value="🔍"
          >
          </form>
      </div>
    `
  };
}

customElements.define('add-movie', AddMovie);

export default AddMovie;
