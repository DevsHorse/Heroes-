	//Create filter's list of films
export const setFilterFilms = data => {
  const arrFilms = [];
  data.map(hero => { if (hero.movies)	hero.movies.map(film => arrFilms.push(film)); });

  const filmsSet = new Set(arrFilms);
  const films = [...filmsSet];
  const filmsList = document.querySelector('.films-list');

  films.forEach((film, i) => {
    const li = document.createElement('li');
    li.classList.add('films-list_item');

    const input = document.createElement('input');
    input.classList.add('checkbox');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('name', '');
    input.id = `film${i}`;

    const label = document.createElement('label');
    label.setAttribute('for', `${input.id}`);
    label.textContent = film;
    filmsList.appendChild(li);
    li.appendChild(input);
    li.appendChild(label);
  });
};
