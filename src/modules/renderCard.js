import { Card } from './classCard';

	// Render cards to page
export const renderHeroCards = data => {
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