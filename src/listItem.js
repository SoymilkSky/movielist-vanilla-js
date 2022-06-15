class ListItem extends HTMLElement {
  constructor() {
    super();

    this.movieName = '';
    this.rating = '';
    this.description = '';
    this.poster = '';
    this.runtime= '';
    this.backdrop = '';
    this.genres = '';
    this.release_date = '';
    this.imdb_id = '';

  }

  newTab() {
    window.open(`https://www.imdb.com/title/${this.imdb_id}`);
  }

  connectedCallback() {
    this.movieName = this.getAttribute('movieName');
    this.rating = this.getAttribute('rating');
    this.description = this.getAttribute('description');
    this.poster = this.getAttribute('poster');
    this.runtime = this.getAttribute('runtime');
    this.backdrop = this.getAttribute('backdrop');
    this.genres = this.getAttribute('genres');
    this.release_date = this.getAttribute('release_date');
    this.imdb_id = this.getAttribute('imdb_id');

    this.render();
    document.getElementById(this.movieName).addEventListener('click', this.newTab.bind(this));
  }

  render() {
    this.innerHTML = `
    <div class="movie-card" id="${this.movieName}">
    <div class="info-section">
      <div class="movie-header">
        <img class="poster" src=${this.poster} />
        <h1>${this.movieName}</h1>
        <h4>${this.release_date.slice(0, 4)}</h4>
        <span class="runtime">${this.runtime} min</span>
        <p class="genres">${this.genres}</p>
      </div>
      <div class="movie-description">
        <p class="description">${this.description}</p>
      </div>
    </div>
    <div
      class="backdrop"
      style="background:url(${this.backdrop});"></div>
  </div>
    `
  }
}

customElements.define('list-item', ListItem);

function addListItem(movie) {
  let item = document.createElement('list-item');
  item.setAttribute('movieName', movie.movieName);
  item.setAttribute('rating', movie.rating);
  item.setAttribute('description', movie.description);
  item.setAttribute('poster', movie.poster);
  item.setAttribute('runtime', movie.runtime);
  item.setAttribute('backdrop', movie.backdrop);
  item.setAttribute('genres', movie.genres);
  item.setAttribute('release_date', movie.release_date);
  item.setAttribute('imdb_id', movie.imdb_id);

  document.getElementById('movie-list').appendChild(item)
}

export default addListItem;
