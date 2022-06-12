class ListItem extends HTMLElement {
  constructor() {
    super();

    this.movieName = '';
    this.rating = '';
    this.description = '';
    this.movieThumbnail = '';
  }

  connectedCallback() {
    this.movieName = this.getAttribute('movieName');
    this.rating = this.getAttribute('rating');
    this.description = this.getAttribute('description');
    this.movieThumbnail = this.getAttribute('movieThumbnail');

    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="list-item">
        <h1>${this.movieName}</h1>
        <img src=${this.movieThumbnail} alt="movieThumbnail" width="250" height="350"/>
        <p>Rating: ${this.rating}</p>
        <p>${this.description}</p
      </div>
    `
  }
}

customElements.define('list-item', ListItem);

export default ListItem;