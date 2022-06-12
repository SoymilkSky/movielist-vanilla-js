import movies from './data.js';
import ListItem from './listItem.js';

movies.map((movie) => {
  let item = document.createElement('list-item');
  item.setAttribute('movieName', movie.Title);
  item.setAttribute('rating', movie.imdbRating);
  item.setAttribute('description', movie.Plot);
  item.setAttribute('movieThumbnail', movie.Poster);

  document.getElementById('movie-list').append(item);
});