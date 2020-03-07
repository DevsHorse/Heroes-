'use strict';

document.addEventListener('DOMContentLoaded', () => {

	//@ AJAX request
	const getData = () => fetch('../dbHeroes.json')
		.then(res => res.json())
		.catch(err => {
			console.error(err);
			return null;
		});

	//Create filter's list of films
	const setFilterFilms = data => {
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

	//Valid for classes options
	const isValidString = str => {
		const isEmptyString = /\s+/ig.test(str);
		return typeof str === 'string' && str.length > 0 && !isEmptyString;
	};

	// Card class
	class Card {
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

	const titleShadowAnimate = () => {
		const title = document.querySelector('.logo');

		let count = 0;
		let inc = 1;
		// eslint-disable-next-line no-unused-vars
		let id = null;

		const animate = () => {
			id = requestAnimationFrame(animate);
			count += inc;
			if (count === 0) {
				inc = 1;
			}

			title.style.textShadow = `0 0 ${5 + count / 5}px #fff`;

			if (count === 50) {
				inc = -1;
			}
		};
		id = requestAnimationFrame(animate);
	};

	titleShadowAnimate();

	const animateFilter = () => {
		const filter = document.querySelector('.films-container');
		filter.style.transition = 'transform 1s ease';

		document.addEventListener('scroll', () => {
			if (document.documentElement.scrollTop > 167) {
				filter.style.transform = `translateY(${document.documentElement.scrollTop - 167}px)`;
			} else {
				filter.style.transform = 'none';
			}
		});
	};

	animateFilter();

	// Render cards to page
	const renderHeroCards = data => {
		data.forEach(hero => {
			const card = new Card(hero.photo, hero.name, hero.realName,
				hero.species, hero.citizenship, hero.gender, hero.actors,
				hero.birthDay, hero.deathDay, hero.status, hero.movies);
			card.createCard();
		});

		const cards = document.querySelectorAll('.card');
		cards.forEach(card => {
			card.addEventListener('mouseenter', () => card.style.transform = 'scale(1.05)');
			card.addEventListener('mouseleave', () => card.style.transform = 'scale(1)');
		});
	};

	const filteringCards = () => {
		const filmsList = document.querySelector('.films-list');
		const cards = document.querySelectorAll('.card');
		const message = document.querySelector('.empty-message');

		/**
		*  	@param {arr[]} container_for_filtering_values
		*/
		let arr = [];

		filmsList.addEventListener('click', event => {
			const target = event.target;

			if (target.type === 'checkbox') {
				const text = target.nextElementSibling.textContent;

				if (target.checked === true) {
					arr.push(text);
				} else {
					arr = arr.filter(item => item !== text);
				}

				cards.forEach(card => {
					if (!card.querySelector('.card-after')) {

						if (arr.length) {
							let counter = 0;

							arr.forEach(item => {
								if (item === 'Doesn\'t have movies*' && arr.length === 1) {
									counter++;
								}
							});

							if (counter > 0) {
								card.style.display = 'block';
							} else {
								card.style.display = 'none';
							}

						} else {
							card.style.display = 'block';
						}

					} else {

						if (arr.length) {
							const filmsLi = card.querySelectorAll('.movies-item');
							let counter = 0;

							filmsLi.forEach(li => {
								arr.forEach(check => {
									if (check === li.textContent) {
										counter++;
									}
								});
							});

							if (counter === arr.length) {
								card.style.display = 'block';
							} else {
								card.style.display = 'none';
							}

						} else {
							card.style.display = 'block';
						}
					}
				});
			}

			// If main block is empty, then display message
			let count = 0;
			cards.forEach(card => {
				if (card.style.display === 'block') {
					count++;
				}
			});

			if (count !== 0) {
				message.style.display = 'none';
			} else {
				message.style.display = 'block';
			}

		});
	};

	// Data's body
	getData().then(data => {
		if (!Array.isArray(data)) {
			throw new Error('Data heroes is missing/not array.');
		}

		setFilterFilms(data);
		renderHeroCards(data);
		filteringCards();
	});



});
