import { animateFilter, titleShadowAnimate } from './modules/animates';
import { renderHeroCards } from './modules/renderCard';
import { setFilterFilms } from './modules/setFilterFilms';
import { filteringCards } from './modules/filteringCards';

document.addEventListener('DOMContentLoaded', () => {
  'use strict';
	//@ AJAX request
	const getData = () => fetch('./dbHeroes.json')
		.then(res => res.json())
		.catch(err => {
			console.error(err);
			return null;
		});

	titleShadowAnimate();
	animateFilter();

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
