import movies from './data.js';
import ListItem from './listItem.js';
import AddMovie from './addMovie.js';

customElements.define('list-item', ListItem);
customElements.define('add-movie', AddMovie);

document.getElementById('search').append(document.createElement('add-movie'));

function mapMovies() {
  movies.map((movie) => {
    let item = document.createElement('list-item');
    item.setAttribute('movieName', movie.Title);
    item.setAttribute('rating', movie.imdbRating);
    item.setAttribute('description', movie.Plot);
    item.setAttribute('movieThumbnail', movie.Poster);

    document.getElementById('movie-list').append(item)
  });
}

mapMovies();
