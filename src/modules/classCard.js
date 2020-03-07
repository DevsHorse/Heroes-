import { isValidString } from './validString';

export class Card {
  constructor(img, name, realname, species, citiz, gender, actors, birthDay, deathDay, status, movies) {
    this.img = img;
    this.name = name;
    this.gender = gender;
    this.actors = actors;
    this.status = status;

    this.realname = isValidString(realname) ? realname : '-';
    this.species = isValidString(species) ? species : '-';
    this.citiz = isValidString(citiz) ? citiz : '-';
    this.birthDay = isValidString(birthDay) ? birthDay : '-';
    this.deathDay = isValidString(deathDay) ? deathDay : '-';
    this.movies = Array.isArray(movies) ? movies : null;
  }
  createCard() {
    const fragment = document.createDocumentFragment();

    const mainBlock = document.querySelector('.main');
    const divCard = document.createElement('div');
    divCard.classList.add('card');

    divCard.innerHTML = `
    <img class="card-img" src="${this.img}" alt="${this.name}">
    <h2 class="card-name">Name: <span class="name">${this.name}</span></h2>
    <h3 class="card-realName">Realname: <span class="realName">${this.realname}</span></h3>
    <div class="card-main">
      <div class="card-species">Species: <span class="species">${this.species}</span></div>
      <div class="card-citizenship">Citizenship: <span class="citizenship">${this.citiz}</span></div>
      <div class="card-gender">Gender: <span class="gender">${this.gender}</span></div>
      <div class="card-actors">Actors: <span class="actors">${this.actors}</span></div>
    </div>
    <div class="card-row">
      <div class="card-birthday">Birthday: <span class="birthday">${this.birthDay}</span></div>
      <div class="card-deathday">Deathday: <span class="deathday">${this.deathDay}</span></div>
    </div>
    <div class="card-status">Status: <span class="status">${this.status}</span></div>
    `;

    const cardAfter = document.createElement('div');
    cardAfter.classList.add('card-after');

    const textFilms = document.createElement('div');
    textFilms.classList.add('card-movies-title');
    textFilms.innerHTML = 'Films:';

    const ulFilms = document.createElement('ul');
    ulFilms.classList.add('card-movies');

    if (this.movies !== null) {
      this.movies.forEach(film => {
        const liFilms = document.createElement('li');
        liFilms.classList.add('movies-item');
        liFilms.textContent = film;
        ulFilms.appendChild(liFilms);
      });
      cardAfter.appendChild(textFilms);
      cardAfter.appendChild(ulFilms);
      divCard.appendChild(cardAfter);
    }

    fragment.appendChild(divCard);
    mainBlock.appendChild(fragment);
  }
}