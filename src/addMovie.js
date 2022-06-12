import movies from './data.js';
import API_KEY from '../config.js';

class AddMovie extends HTMLElement {
  constructor() {
    super();
    this.searchTerm = '';

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
            Title: data.original_title,
            imdbRating: data.vote_average,
            Plot: data.overview,
            Poster: `https://image.tmdb.org/t/p/w500/${data.poster_path}`
          }
          movies.push(movie);
          console.log(movies);
          return movie;
        })
        .then((movie) => {
          let item = document.createElement('list-item');
          item.setAttribute('movieName', movie.Title);
          item.setAttribute('rating', movie.imdbRating);
          item.setAttribute('description', movie.Plot);
          item.setAttribute('movieThumbnail', movie.Poster);

          document.getElementById('movie-list').append(item)
        })
        .catch((err) => new Error(err));
    } else {
      alert('please enter a search term');
    }
  };

  connectedCallback() {
    this.render();
    document.getElementById('submit-button').addEventListener('click', this.fetchMovies);
  }

  render() {
    this.innerHTML = `
      <div>
        <form>
          <label for="search-input">Search: </label>
          <input type="text" id="search-input" name="search-input">
          <input
            type="button"
            id="submit-button"
            name="submit-button"
            value="Search"
          >
        </form>
      </div>
    `
  };
}

export default AddMovie;
